const { Client, GatewayIntentBits } = require("discord.js");
require('dotenv').config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['CHANNEL'], // Required for DMs
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if(message.author.bot) return;
  console.log(`${message.author.tag}: ${message.content}`);
  message.reply({
    content: "hello from bot"
  });
});

client.on('interactionCreate', (interaction) => {
    console.log(interaction);
    interaction.reply("Pong!");
} );


client.login(process.env.ACCESS_TOKEN); // Replace with your real token
