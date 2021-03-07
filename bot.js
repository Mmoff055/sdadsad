const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//========================================Bot Oto-Rol=============================================\\

client.on("guildMemberAdd", async member => {

  let botrol = await db.fetch(`bototorol_${member.guild.id}`);
  let botrol2 = member.guild.roles.find('id', botrol);
  if (!botrol2) return;
    if (botrol) {
      if (member.user.bot) {
        member.addRole(botrol2)
        client.channels.get("EMOJİ ID").send(` \`${member.user.tag}\` adlı bota \`${botrol2.name}\` rolü verildi.`)
      }
  
    }
});

//================================================================================================\\

//==========================================Reklam Engel==========================================\\

client.on('message', async message => {
  let ke = await db.fetch(`reklam_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let reklam = ["discord.gg/", "https://", ".org", ".com", ".cf", ".tk", ".xyz"]
    if (reklam.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("<a:Alev:706112946211651654> **Burda \`Reklam Yasak\` Kardeşim!**")
      }
    }
    
  }
})

//================================================================================================\\

//==========================================Küfür Engel===========================================\\

client.on('message', async message => {
  let ke = await db.fetch(`kufur_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let küfür = ["amk", "amcık", "yarrak", "sik", "amına koyduğum", "kaltak", "yavşak", "orospu", "piç", "ananı sikim", "sikik", "göt", "pezevenk", "gavat", "meme"]
    if (küfür.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("<a:Alev:706112946211651654> **Burda \`Küfür Yasak\` Kardeşim!**")
      }
    }
    
  }
})

//================================================================================================\\

//======================================================Botu Odada 7/24 Tutma===================================================================\\

client.on('ready', ()=>{
client.channels.get('706123402661855252').join() 
})

//===============================================================================================================================================\\

//=====================================================Son Üye Sistemi===========================================================================\\

client.on("guildMemberAdd", async member => {
let onlykanal = client.channels.get("706123336828059739"); 
onlykanal.setName(`👤・Son Üye - ${member.user.username}`)
})

//===============================================================================================================================================\\

//=====================================================Değişgen Kanal İsmi=======================================================================\\

client.on("ready", () => {
 let suncode = '706100224195690496'
  let suncode1 = '706123296634175540'
 
var Games = [
  `📌・Her Şey Sizler İçin...`,
  `💥・JavaScript Almak İçin +js`,
  `🔨・İyi Kodlamalar`,
  ];
  setInterval(function() {
    var random = Math.floor(Math.random()*(Games.length));
    client.guilds.get(suncode).channels.get(suncode1).setName(`${Games[random]}`)
  }, 5000);
})

//===============================================================================================================================================\\

//=================================================================JS Eventleri==================================================================\\

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.js') {
    msg.reply('**Doğru Kullanım \`+js\`** <a:Alev:706112946211651654>');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-js') {
    msg.reply('**Doğru Kullanım \`+js\`** <a:Alev:706112946211651654>');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!js') {
    msg.reply('**Doğru Kullanım \`+js\`** <a:Alev:706112946211651654>');
  }
});

//===============================================================================================================================================\\

//============================================================Yeni Gelene Rol Vemer==============================================================\\

client.on("guildMemberAdd", member => {
var rol = member.guild.roles.get("706103567076950067")
member.addRole(rol)
   })

//===============================================================================================================================================\\

//==============================================================Sa-As Sistemi====================================================================\\

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm selam,hoş geldin** <a:Alev:706112946211651654>').then(msg => msg.delete(5000));
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.reply('**Aleyküm selam,hoş geldin** <a:Alev:706112946211651654>').then(msg => msg.delete(5000));
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('**Aleyküm selam,hoş geldin** <a:Alev:706112946211651654>').then(msg => msg.delete(5000));
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'slm') {
    msg.reply('** Aleyküm selam,hoş geldin** <a:Alev:706112946211651654>').then(msg => msg.delete(5000));
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
    msg.reply('**Aleyküm selam,hoş geldin** <a:Alev:706112946211651654>').then(msg => msg.delete(5000));
  }
});

//===============================================================================================================================================\\