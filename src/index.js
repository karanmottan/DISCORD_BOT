const Discord = require('discord.js');
const config = require('./config.json');
const { getResponseText } = require('./dialogFlow/dialog');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
  });


  client.on('message', async( message ) => {
    if(!message.author.bot){
        const entered = message.content;
        const repl = await getResponseText(entered);
        if(repl !== null){
            message.reply(repl);
        }
    }  
   

});
client.login(config.BOT_TOKEN);