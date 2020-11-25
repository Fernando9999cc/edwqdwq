const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.login(config.token);

client.on('guildCreate', guild => {
  const embedentrada = new Discord.MessageEmbed()
    .setAuthor(client.user.username)
    .setTitle('**Entrei em um servidor**')
    .addField(`**Nome do servidor:**`, `\`${guild.name}\``)
    .addField(`**Id do servidor**`, `\`${guild.id}\``)
    .addField(`** Membros:**`, `\`${guild.memberCount}\``)
    .addField(`** Dono do servidor**`, `${guild.owner}`)
    .setTimestamp()
    .setColor('#0b04f3')

  client.channels.cache.get("764210823106265159").send(embedentrada);
});

const mongoose = require("mongoose");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();
client.events = new Discord.Collection();
client.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/messageUpdate")(oldMessage, newMessage);
});
client.on("messageDelete", async (message) => {
  require("./events/messageDelete")(message);
});

const db = require('quick.db');

client.on('guildDelete', guild => {
  let embedesaida = new Discord.MessageEmbed()
    .setAuthor(client.user.username)
    .setTitle('**Me removeram q triste**')
    .addField(`**Nome do servidor:**`, `\`${guild.name}\``)
    .addField(`**Id do servidor**`, `\`${guild.id}\``)
    .addField(`**Membros:**`, `\`${guild.memberCount}\``)
    .addField(`**Dono do servidor**`, `\`${guild.owner}\``)
    .setTimestamp()
    .setColor('#0b04f3')

 client.channels.cache.get("764210917352538183").send(embedsaida);
})

client.on("guildMemberAdd", async (member) => {

  let guild = await client.guilds.cache.get("758694634288578630"); // ID do servidor
  let channel = await client.channels.cache.get("758721541055315989"); // ID do canal
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Parrot");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`Ah olá amigo, bem vindo ao nosso cemitério ;)`)
      .setDescription(`**${member.user}**, Aqui você poderá criar seu personagem em <#758783812242636850> para o rpg e conversar no <#758723288452825109> mas primeiro leia as regras em <#758721746039210035>  e se diverta^^`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Yay! mais um membro :3")
      .setTimestamp();

    await channel.send(embed);
  }
});

// Comando de Entrada
client.on("guildMemberAdd", async (member) => {

  let guild = await client.guilds.cache.get("732391039247319151"); // ID do servidor
  let channel = await client.channels.cache.get("732391039800705108"); // ID do canal
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Parrot");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas! ${emoji}`)
      .setImage("https://media.giphy.com/media/ree8xCap5nHi/giphy.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! e leia as #⛔-regrinhas, monte seu personagem em #👥-pєrsσทαgєทs e coclua seu registro em #📝╽registro :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Yay! mais um membro :3")
      .setTimestamp();

    await channel.send(embed);
  }
});

// Comando de status
client.on("ready", () => {
  let activities = [
    `Utilize ${config.prefix}help para obter ajuda`,
    `${client.guilds.cache.size} servidores!`,
    `${client.channels.cache.size} canais!`,
    `${client.users.cache.size} usuários!`,
    `Meu prefix ${config.prefix}`,
    `Vote em mim!`,
    `Estou todos os dias com novos comandos!`
  ],
    i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "PLAYING"
  }), 5000);
  client.user
    .setStatus("dnd")
    .catch(console.error);
  console.log("YAY! Estou Online!")
});

// Comando de Saida
client.on("guildMemberRemove", async (member) => {

  let guild = await client.guilds.cache.get("738488790024192111");
  let channel = await client.channels.cache.get("738505642607640726");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Parrot");
  if (guild != member.guild) {
    return console.log("Algum saco pela saiu do servidor. Mas não é nesse, então tá tudo bem :)");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`😪 Adeus! 😪`)
      .setImage("https://media.giphy.com/media/mvRwcoCJ9kGTS/giphy.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Baka! porque isso?")
      .setTimestamp();

    channel.send(embed);
  }
});

// Comando de Entrada
client.on("guildMemberAdd", async (member) => {

  let guild = await client.guilds.cache.get("770253040472686613"); // ID do servidor
  let channel = await client.channels.cache.get("770253040472686616"); // ID do canal
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Parrot");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
  } else {
    let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas `)
      .setImage("https://media.giphy.com/media/ree8xCap5nHi/giphy.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Yay! mais um membro :3")
      .setTimestamp();

    await channel.send(embed);
  }
});

// O bot irá responder comandos com isso
client.on('message', message => {

       if (message.mentions.members.first() == "739218168391925780") {

let embedmen = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`:star: | Olá ${message.author.username}!`)
.setDescription(":sparkles: | Prefixo: `a!`\n :sparkles: | Help: `.help`\n :sparkles: | Meu criador: `Aquarela'Black#0101`")

.setThumbnail(client.user.displayAvatarURL())
return message.channel.send(embedmen)
       }

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);
  } catch (err) {
    console.error('Erro:' + err);
    message.channel.send("**Este Comando Não Exite.**")
  }
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token2