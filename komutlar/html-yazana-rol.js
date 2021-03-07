const Discord = require('discord.js');
exports.run = function(client, message) {
  const rol = message.guild.roles.find(role => role.id === "706618913588379650"); 
  message.delete(); 
  message.member.addRole(rol);
  message.channel.send(`\`💻・HTML\` **Rolü Başarı İle Verilldi**`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['html'],
  permLevel: 0
};
exports.help = {
  name: 'html',
  description: 'HTML rolü verir, tabii ki kod ile!',
  usage: 'html'
};