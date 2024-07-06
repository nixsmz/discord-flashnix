module.exports = {
    name: "help",
    description: "Shows this help message.",
    permissions: [],
    async execute(client, message, args) {
        console.log(`Help for ${client.user.username}.`);
        await message.reply({ content: `Help for ${message.author.username}.` });
    }
};
