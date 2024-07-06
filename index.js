// Modules
const discord = require("discord.js");
const path = require("path");
const fs = require("fs");

// Configuration file
const config = require("./config.json");

// Local constants
const commandsDir = "./commands";

// Discord client
const client = new discord.Client({ intents: Object.values(discord.GatewayIntentBits) });
client.prefix = config.prefix;

// Requiring all commands
client.commands = new Map();
fs.readdirSync(commandsDir).forEach(function(dir) {
    var commandGroup = `${commandsDir}/${dir}`;
    fs.readdirSync(commandGroup).forEach(function(module) {
        try { 
            const cmd = require(`${commandGroup}/${module}`);
            client.commands.set(cmd.name, cmd);
        }
        catch { console.log(`Could not load module "${`${commandGroup}/${module}`}".`); }
    });
});

// On client connection
client.once(discord.Events.ClientReady, readyClient => {
    console.log(`Server online (@${readyClient.user.username}).`);
});

// On client message reception
client.on(discord.Events.MessageCreate, async (message) => {
    if(!message.content.startsWith(client.prefix)) return;
    const command = message.content.split(client.prefix)[1].split(" ");
    const commandName = command[0];
    try {
        if(client.commands.has(commandName)) {
            client.commands.get(commandName).execute(client, message, command);
        }
    } catch { console.log(`Could not execute command ${commandName}`); }
    console.log(`${message.author.username} : ${commandName}`);
});

// Discord client login
client.login(config.token).catch(e => {
    console.log(`Client could not login.`);
});
