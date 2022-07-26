const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'elo',
  aliases: [],
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.reply('Você está usando de forma incorreta | !elo (mencione alguém)');
    }
    const data = await schem.findOne({ UserID: `${user.id}` });

    const novoElo = 25;
    data.Elo = parseInt(data.Elo + novoElo);
    await data.save();
    const embed = new Discord.MessageEmbed()
      .setTitle('SUCESSO!')
      .setDescription(`🧿 | Todas as pessoas receberam elo!`);
    return message.reply({ embeds: [embed] });
  },
};
