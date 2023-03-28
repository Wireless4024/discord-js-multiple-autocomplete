const {SlashCommandBuilder, AutocompleteInteraction} = require('discord.js');
// Require the necessary discord.js classes
const {Client, Events} = require('discord.js');

const token = process.env.TOKEN
if (!token) throw Error("Missing token")

// Create a new client instance
const client = new Client({intents: []});

const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('test command!')
  .addStringOption(option =>
    option.setName('node')
      .setDescription('Node')
      .setAutocomplete(true))
  .addStringOption(option =>
    option.setName('container_id')
      .setDescription('container id')
      .setAutocomplete(true));

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  try {
    //const command = await client.application.commands.create(data);
    //console.log(`Registered slash command "${command.name}"`);
  } catch (error) {
    console.error(error);
  }
});
client.on(Events.InteractionCreate, async interaction => {
  if (!(interaction instanceof AutocompleteInteraction)) return;
  // do autocomplete handling
  const focus = interaction.options._hoistedOptions.find(it => it.focused).name

  if (focus == "node") {
    await interaction.respond(["A", "B", "C"].map(choice => ({name: choice, value: choice})))
  } else if (focus == "container_id") {
    await interaction.respond(["D", "E", "F"].map(choice => ({name: choice, value: choice})))
  }
});


// Log in to Discord with your client's token
client.login(token);