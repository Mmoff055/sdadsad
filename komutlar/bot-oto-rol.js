const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`<a:Alev:706112946211651654> **Bu Komutu Kullana Bilmek İçin Yeterli \`Yetkiye\` Sahip Değilsin.**`);
  
  let rol = message.mentions.roles.first()
  if (!rol) return message.channel.send(`<a:Alev:706112946211651654> **Bot-Oto-Rol Ayarlamak İçin \`@Bot\` Yazman Gerek**`)

  db.set(`bototorol_${message.guild.id}`, rol.id)
  message.channel.send(`<a:Alev:706112946211651654> **Bot otorol \`${rol.name}\` olarak ayarlandı. Kapatmak için \`${prefix}bototorol\` yazmalısın.**`)

};
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['bot-oto-rol'],
    permLevel: 0
}

exports.help = {
    name: 'bototorol',
    description: 'Sunucuya giren bota seçtiğiniz rolü otomatik verir.',
    usage: 'bototorol <@rol>'
}