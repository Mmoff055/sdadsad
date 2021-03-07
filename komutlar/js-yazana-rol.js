const Discord = require('discord.js');
exports.run = function(client, message) {
  const rol = message.guild.roles.find(role => role.id === "706121341627138050"); 
  message.delete(); 
  message.member.addRole(rol);
  message.channel.send(`\`📁・JavaScipt\` **Rolü Başarı İle Verilldi**`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['js'],
  permLevel: 0
};
exports.help = {
  name: 'js',
  description: 'Javascript rolü verir, tabii ki kod ile!',
  usage: 'js'
};