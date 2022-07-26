const Discord = require('discord.js');
dotenv = require('dotenv').config();
const client = new Discord.Client({ intents: 32767 });
const c = require('colors');
const mongoose = require('mongoose');

const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');

const firebaseConfig = {
  apiKey: 'AIzaSyCTLNlIevcq5q1KJOPYFl7eHuevLRTZmQc',
  authDomain: 'bot-dc-9176a.firebaseapp.com',
  databaseURL: 'https://bot-dc-9176a-default-rtdb.firebaseio.com',
  projectId: 'bot-dc-9176a',
  storageBucket: 'bot-dc-9176a.appspot.com',
  messagingSenderId: '925831499700',
  appId: '1:925831499700:web:0ab32189a3b4c6ddb9ece1',
  measurementId: 'G-WDK1XV6Q07',
};

// Initialize Firebase
const apps = initializeApp(firebaseConfig);

const firebase = require('firebase');
const database = firebase.database(); // const em inicio de scripts

client.on('ready', (client) => {
  database
    .ref(`ini/${client.user.id}`)
    .once('value')
    .then(async function (db) {
      if (db.val() == null) {
        database.ref(`ini/${client.user.id}`).set({
          ini: 1,
        });
        return;
      }

      database.ref(`ini/${client.user.id}`).update({
        ini: db.val().ini + 1, // soma
      });

      console.log('Fui iniciado :' + `${db.val().ini + 1} ` + '\nvezes');
    });
});

const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach((local) => {
  const comandos = fs
    .readdirSync(`./commands/${local}`)
    .filter((arquivo) => arquivo.endsWith('.js'));

  for (let file of comandos) {
    let puxar = require(`./commands/${local}/${file}`);

    if (puxar.name) {
      client.commands.set(puxar.name, puxar);
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach((x) => client.aliases.set(x, puxar.name));
  }
});

client.on('messageCreate', async (message) => {
  let prefix = process.env.PREFIX;

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  try {
    command.run(client, message, args);
  } catch (err) {
    console.error('Erro:' + err);
  }
});

//Conexão mongoose(DATA BASE)
client.on('ready', () => {
  console.log('Mongoose iniciada');
  mongoose.connect(process.env.MONGOOSE);
});

try {
  client.login(process.env.TOKEN);
} catch (error) {
  console.log(error);
}
