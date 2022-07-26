const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'bio',
  aliases: [],
  run: async (client, message, args) => {
    const bio = args.join(' ');
    if (!bio) return message.reply('a');

    schem.findOne({ UserID: message.author.id }, async (err, data) => {
      if (!data) return message.reply('vc n ta registrado');

      data.Bio = bio;
      data.save();
      message.reply('Biografia modificada para: ' + bio);
    });
  },
};
