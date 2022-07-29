/* eslint-disable no-irregular-whitespace */
const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'register',
  aliases: ['registro'],
  run: async (client, message, args) => {
    const text = new RegExp("^[ 0-9a-zA-Z\b]+$")
    const argumentos = args[0];
      
    if(argumentos.length > 16) { 
      return message.reply('Ops, seu nick não pode ter mais que ')
    }
    // if(argumentos.length === )
    schem.findOne({ Nickname: argumentos }, async (err, data) => {
      if (data) {
        return message.reply('Já existe alguém com esse nick, ou você já está registrado');
      }
      schem.findOne({ UserID: message.author.id }, async (err, data) => {
        if (err) throw err;
        if (data) return message.reply('você já esta registrado');
        schem.create({ UserID: message.author.id, Nickname: argumentos });
        const embed = new Discord.MessageEmbed()
          .setTitle(`🚧​ | Nick registrado: ${argumentos}`)
          .setColor('RANDOM')
          .setDescription(`**🌈​ | Discord do registrado:**<@${message.author.id}> \n `)
          .setThumbnail(`https://mc-heads.net/avatar/${argumentos}`);
        return message.reply({ embeds: [embed] });
      });
    });
  },
};
