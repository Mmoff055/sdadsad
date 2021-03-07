const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let isteg = args.join(" ").slice(0);
let üye = message.author.username;
let guild = message.guild.name;
let guildid = message.guild.id;
let kanal = message.channel.name;
let kanall = bot.channels.get("706647937362690078")
let embed = new Discord.RichEmbed()
.setTitle("<a:Alev:706112946211651654> NexCode| İstek Bildirme <a:Alev:706112946211651654>")
.setThumbnail(bot.user.avatarURL)
.setColor('GOLD')
.addField("<:Sag2:706287414838296807> Komutu İsteyen", üye, true)
.addField("<:Sag2:706287414838296807> İstenen Komut", isteg)

message.channel.send("**<a:Alev:706112946211651654> | İsteğiniz Yetkililerimize Ulaştı.Teşekkürler | <a:Alev:706112946211651654>**")
kanall.send(embed).then(i => i.react(":white_check_mark:"))

  

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istek-kod', 'i-k', 'ik', 'istekkod'],
  permLevel: 0  
};

exports.help = {
  name: 'istek-bildir',
  category: 'kullanıcı-yardım',
  description: 'İstek Komutunuzu Bildirir',
  usage: 'istek-bildir'
}