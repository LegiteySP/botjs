const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'perfil',
  aliases: [],
  run: async (client, message, args) => {


    schem.findOne({ UserID: message.author.id }, async (err, data) => {
      if (!data) return message.reply('Ops, parece que você não está registrado!');
        const embed = new Discord.MessageEmbed()
        .setTitle('Consultado com sucesso')
    });
  },
};
