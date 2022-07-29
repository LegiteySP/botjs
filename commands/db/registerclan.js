const Discord = require("discord.js");
const schem = require("./model/model2");
const mongoose = require("mongoose");
module.exports = {
  name: "registerclan",
  aliases: [],
  run: async (client, message, args) => {
    const argumentos = args.join(" ");
    const usuario = message.mentions.users.first();

    const classe = await schem.findOne({ Clan: argumentos });

    if (classe) {
      return message.reply("Opa, parece que tem um clã com esse nome hein");
    }

    await schem.create({ Clan: argumentos });

    const embed = new Discord.MessageEmbed()
      .setTitle("Clã registrado com sucesso!")
      .setDescription(
        `Clã registrado: ${argumentos} \n Quem registrou: <@${message.author.id}>`
      );

    return message.reply({ embeds: [embed] });
  },
};