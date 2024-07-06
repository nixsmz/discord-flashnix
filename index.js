const { Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

// Discord client
const client = new Client({ intents: Object.values(GatewayIntentBits) });

// On client connection
client.once(Events.ClientReady, readyClient => {
    console.log(`Server online (@${readyClient.user.username}).`);
});

// On client message reception
client.on(Events.MessageCreate, async (message) => {
    if(!message.content.startsWith(config.prefix)) return;
    console.log(`${message.author.username} : ${message.content}`);
});

// Discord client login
client.login(config.token).catch(e => {
    console.log(`Client could not login.`);
});
