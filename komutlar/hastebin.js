const Discord = require('discord.js');
const snekfetch = require("snekfetch");
exports.run = async (client, message, args) => {
  if (!args[0]) { 
    return message.channel.send("<a:Alev:706112946211651654> Hastebin'e ne göndermek istersin?") }
  snekfetch.post("https://nex-code-bin.glitch.me/documents").send(args.slice(0).join(" ")).then(body => {
    message.channel.send(`Kodu Paylaşan: <@${message.author.id}> https://nex-code-bin.glitch.me/` + body.body.key);
       });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hastebin', 'hasteb'],
  permLevel: 0
};

exports.help = {
  name: 'hastebin',
  description: 'İstediğiniz Yazıyı Hastebine Yükler.',
  usage: 'hastebin'
};