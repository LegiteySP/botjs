const Discord = require("discord.js")

module.exports = {
    name: "settik", // Coloque o nome do comando do arquivo
    aliases: ["st"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

       if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`\❌ ${message.author} Você não tem permissão para isso!`);

       if (!message.guild.me.permissions.has("ADMINISTRADOR")) return message.reply(`\❌ ${message.author} Eu não tenho permissão para isso!`);

       let channel =  message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

       if (!channel) return message.reply(`Você não está usando de forma correta | !settik (canal)`);

       let criar = new Discord.MessageButton().setCustomId("d").setLabel("❓").setStyle("SECONDARY")
       let criar2 = new Discord.MessageButton().setCustomId("dd").setLabel("⚠️").setStyle("SECONDARY")
       let criar3 = new Discord.MessageButton().setCustomId("r").setLabel("📑").setStyle("SECONDARY")
      let criar5 = new Discord.MessageButton().setCustomId("i").setLabel("📝").setStyle("SECONDARY")
      let criar6 = new Discord.MessageButton().setCustomId("ss").setLabel("🔎").setStyle("SECONDARY")

       message.reply(`\✅ ${message.author} O sistema de ticket foi configurado com sucesso.`);
    
       let row = new Discord.MessageActionRow().addComponents(criar, criar2, criar3, criar5, criar6)

       let embed = new Discord.MessageEmbed()
       .setTitle(`⚜️​ | Vibranium Suporte`)
       .setDescription(`❓ **- Duvidas**\n Para tirar duvidas gerais, discord, sobre campeonato, premiações e etc... USE COM RESPONSABILIDADE`)
       .setColor("#6f3dc4")

       channel.send({embeds: [embed], components: [row]})


        
    }
}