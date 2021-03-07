const Discord = require('discord.js');
const db = require('quick.db');
const a = require('../ayarlar.json') 
 
exports.run = async function(client, message, args) {
  
  if(message.channel.id != "KANAL ID") return message.channel.send(':x: **Bu Komutudu <#KANAL ID> Kanalında Kullan!**').then(n => n.delete(5000));
  
  
  message.channel.bulkDelete(1)
  let user = message.author
    
  const cfx1 = new Discord.RichEmbed()
  .setDescription(`**Hatalı-Kod-Log Kanalı Ayarlanmamış!** \n\n **Ayarlamak İçin:** \`${a.prefix}hatalı-kanal ayarla #kanal\``)
  .setColor("#00ff88")
  .setFooter(`${client.user.username} | Hatalı-Kod Sistemi.`, client.user.avatarURL)
  const cfx2 = new Discord.RichEmbed()
  .setDescription(`\`${user.tag}\` Lütfen hatalı kodu belirtin.`)
  .setColor("#00ff88")
  .setFooter(`${client.user.username} | Hatalı-Kod Sistemi.`, client.user.avatarURL)

  const cfx4 = new Discord.RichEmbed()
  .setDescription(`\`${user.tag}\` Hatalı Kod Bildirimin Yetkililere Ulaştı! Yakında Düzeltilir!`)
  .setColor("#00ff88")
  .setFooter(`${client.user.username} | Hatalı-Kod Sistemi.`, client.user.avatarURL)

  
  
  
    let cfxhatalıkanal = await db.fetch(`hatalıkanal${message.guild.id}`)
    let chan = message.guild.channels.find('id', cfxhatalıkanal)
    let code = args.slice(0).join(' ');
    if (!cfxhatalıkanal) return message.channel.send(cfx1)
    if (code.length < 1) return message.channel.send(cfx2);
  if (message.author) {





message.author.send(cfx4).then(m => {
  m.delete(300000)
})



  db.set(`emo${message.author.id}`, message.author.id)
    let emo = await db.fetch(`emo${message.author.id}`)

     chan.send(`<@&678165769963700224>`).then(m => {
chan.send(new Discord.RichEmbed()
.setColor("#00ff88")
.addField(`\n\nKullanıcı Adı`, message.author.username,true)
.addField(`Kullanıcı ID`,message.author.id,true)
.addField("**Hatalı Kod**", `\`${code}\``)
.addField("Sayın Yetkililer! Kod Düzeltildiyse `✅` Buna, Düzeltilmediyse Veya Hatasız `❎` Buna Basınız! Boş Yere Kullanan Kişiler Ceza Alıcaktır! ", "** **")          
.setThumbnail(message.author.avatarURL))
.then(async function(sentEmbed) {

        const emojideistir = ["✅", "❎", "🔒"];
        const filter = (reaction) =>

          emojideistir.includes(reaction.emoji.name)

        await sentEmbed.react(emojideistir[0]).catch(function() {});
        await sentEmbed.react(emojideistir[1]).catch(function() {});
        await sentEmbed.react(emojideistir[2]).catch(function() {});
              var reactions = sentEmbed.createReactionCollector(filter, {
        });
 reactions.on("collect", async function (reaction) {
   if(reaction.bot) return;
				if (reaction.emoji.name === "✅") {          
          message.guild.members.find(x => x.id === emo).send(':tada: **Hatalı Bildirdiğiniz Kod Yetkilier Tarafından Düzeltildi! Teşşekürler!**')
        }
 
    if (reaction.emoji.name === "❎") {          
    message.guild.members.find(sads => sads.id === emo).send(':x: **Hatalı Diye Bildirdiğiniz Kod Yetkililer Tarafından İncelendi! Bir Hata Bulunamadı Üzgünüm!**')     
   }   
     
})})
})  
}};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'hata'
};
