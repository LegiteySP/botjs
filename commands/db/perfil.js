const schem = require('./model');

module.exports = {
  name: 'perfil',
  aliases: [],

  run: async (_client, message) => {
    const user = message.mentions.users.first() || message.author.id;
    const data = await schem.findOne({ UserID: `${user.id}` });
    return message.reply(`${data.Nickname}`);
  },
};
