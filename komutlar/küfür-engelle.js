const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!args[0]){
    message.channel.send("<a:Alev:706112946211651654> **\`Küfür Engel\` için Doğru Kullanım: \`.küfür-engel aç / .küfür-engel kapat\`**")
  }
  if (args[0] === 'aç'){
    message.channel.send("<a:Alev:706112946211651654> **\`Küfür Engel\` başarıyla açıldı! Artık \`küfürler\` silinecek.**")
    
    db.set(`kufur_${message.guild.id}`, "acik")
  }
  if (args[0] === 'kapat'){
    message.channel.send("<a:Alev:706112946211651654> **\`Küfür engel\` kapatıldı! Bundan sonra \`küfür\` serbest.**")
    
    db.set(`kufur_${message.guild.id}`, "kapali")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür", "kufur-engel", "kufur", "kufur-engelle", "küfür-engelle"],
  permLevel: 2
}
exports.help = {
  name: "küfür-engel",
  description: "Küfür engel açar yada kapatır.",
  usage: ".küfür-engel"
}
