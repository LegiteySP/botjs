// const Discord = require('discord.js');
// require('dotenv').config();
// const client = new Discord.Client({
//   intents: [
//     Discord.GatewayIntentBits.MessageContent,
//     Discord.GatewayIntentBits.GuildMessages,
//     Discord.GatewayIntentBits.Guilds,
//   ],
// });
// const array = [];
// client.on('messageCreate', (message) => {
//   //ignorando bot ou mensagens vazias
//   if (message.author.bot || message.content.length === 0 || !message.content.startsWith('!')) {
//     console.log('Ignorando msg');

//     return;
//   }

//   const args = message.content.split(' ');
//   const commandName = args.shift();
//   if (!commandName) {
//     return;
//   }
//   switch (commandName) {
//     case '!add':
//       array.push(args[0]); // adiciona um novo item
//       // const items = arr.join(', '); // transforma todos os itens em string separado por ", "
//       message.reply(`Seu array possui: ${array.join(', ')}`);
//       break;

//     default:
//       break;
//   }
// });

// try {
//   client.login(process.env.TOKEN);
// } catch (error) {
//   console.log(error);
// }
