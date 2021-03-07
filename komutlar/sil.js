const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
//

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.reply("<a:Firlaniyor:706793227440881685> **En Az \`1-100\` Arası \`Rakam\` Girmelisin.**");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`<a:EvetTick:706793308143222845> **Başarı İle \`${args[0]}\` Mesaj Temizlendi.**`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "sil"
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2,
};

exports.help = {
  name: 'sil',
  description: '',
  usage: '',
}