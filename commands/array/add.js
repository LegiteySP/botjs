const Discord = require('discord.js')
module.exports = { 
  name:'add',
  aliases: [],
  run: async(client, message, args) => { 
    const arr = []
    function array( ) { 
      arr.push(args[0])
      return message.reply(`Seu array possui [${args[0]}]`)
    }
    array()

  }
}