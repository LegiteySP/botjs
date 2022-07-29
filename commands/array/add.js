const arr = []
const Discord = require('discord.js')
module.exports = { 
  name:'add',
  aliases: [],
  run: async(client, message, args) => { 
    arr.push(args[0]) // adiciona um novo item
    const items = arr.join(", ") // transforma todos os itens em string separado por ", "
   return message.reply(`Seu array possui: ${items}`)
   
  }
}