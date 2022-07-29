const Discord = require('discord.js');
const mongoose = require('mongoose');
const schem = require('./model');

module.exports = {
  name: 'perfil',
  aliases: [],
  run: async (client, message, args) => {
      const usuario = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
    
    const classe = await schem.findOne({UserID: `${usuario.id}`})
    if(!classe) {
      return message.reply('Parece que você não está registrado')
  } else {
  
    const embed = new Discord.MessageEmbed()
    .setTitle('Consulta feita com sucesso')
    .setDescription(`🚧​ **|** **Nick in game: ${classe.Nickname}** \n🔰​ **| Discord do consultado: <@${classe.UserID}>/${classe.UserID}**\n 💬 **| Bio: ${classe.Bio}** \n Likes: ${classe.Like}` )
    .setThumbnail(`https://mc-heads.net/combo/${classe.Nickname}`)
    return message.reply({embeds: [embed]}).then(msg => {
      msg.react('👍')

      let filtro0 = (r, u) => r.emoji.name === '👍' && u.id === message.author.id;

      let coletor0 = msg.createReactionCollector(filtro0);

      coletor0.on("collect", c => { 
        const novoLike = 1;
    classe.Like = parseInt(classe.Like + novoLike);
    classe.save()
      })
    })
  }
      
  
  }
}
