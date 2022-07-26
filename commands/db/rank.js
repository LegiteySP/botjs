const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'rank',
  aliases: [],
  run: async (client, message, args) => {
    const leaderBoard = await schem.find().sort(-data.Elo).limit(10);
    const embed = new Discord.MessageEmbed().setDescription(
      leaderBoard.map((c) => `${c.UserID} tem ${c.Elo} moedas`),
    );
    return message.reply({ embeds: [embed] });
  },
};
