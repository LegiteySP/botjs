const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: 32767 });
const mongoose = require('mongoose');

const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach((local) => {
  const comandos = fs
    .readdirSync(`./commands/${local}`)
    .filter((arquivo) => arquivo.endsWith('.js'));

  for (let file of comandos) {
    let puxar = require(`./commands/${local}/${file}`);

    if (puxar.name) {
      client.commands.set(puxar.name, puxar);
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach((x) => client.aliases.set(x, puxar.name));
  }
});

client.on('messageCreate', async (message) => {
  let prefix = process.env.PREFIX;

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  try {
    command.run(client, message, args);
  } catch (err) {
    console.error('Erro:' + err);
  }
});

//Conexão mongoose(DATA BASE)
client.on('ready', () => {
  console.log('Mongoose iniciada');
  mongoose.connect(process.env.MONGOOSE);
});


//ticket 
client.on('interactionCreate', interaction => {

    let fazer = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")
    let sair = new Discord.MessageButton().setCustomId("f").setLabel("Feche seu ticket").setStyle("PRIMARY")

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('c')) {

            let find = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.id}`);

            if (find) return interaction.reply({ content: `**\❌ ${interaction.user} Você já tem um ticket aberto: ${find}**`, ephemeral: true })

            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                permissionOverwrites: [
                    {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                    }
                ], 
                
                            }).then(async channel => {

                                interaction.reply({content: `Seu ticket foi criado em: ${channel}`, ephemeral: true})

                                const row = new Discord.MessageActionRow().addComponents(sair)

                                let embed = new Discord.MessageEmbed()
                                .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                .setDescription(`**> ${interaction.user}.\n> Seu ticket está aberto. \n> Feche seu ticket com o botão abaixo.**`)
                                .setColor("RANDOM")
                                .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))

                                channel.send({ content: `${interaction.user}`,embeds: [embed], components: [row]}).then(msg => {
                                    msg.pin()
                                })
                            })
        }
        if (interaction.customId.startsWith('f')) {

            interaction.reply(`**\🔒 ${interaction.user} Seu ticket será fechado em 5 segundos.**`)

            setTimeout( () => {

                try {

                interaction.channel.delete()

                }
                catch (er) 
                {
                    console.log(er)
                }

            }, 5000)

        }
    }
})


try {
  client.login(process.env.TOKEN);
} catch (error) {
  console.log(error);
}
