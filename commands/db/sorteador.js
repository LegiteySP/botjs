const Discord = require('discord.js')
const mongoose = require('mongoose')
const schem = require('./model')
module.exports ={ 
  name:'sorteador',
  aliases: [],
   run: async(client, message, args) => { 
  schem.findOne({ Clan: args.join(" ") }, async (err, data) => {
      if (!data) return message.reply('Clã não registrado');
      
      
  
  })
   }
}