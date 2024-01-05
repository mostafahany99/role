const Discord = require('discord.js');

module.exports = {
  name: "help",
  aliases: ["h"],
  usage: "help",
  description: "list of command",
  run: async (client, message, args) => {

    
    const embed = new Discord.MessageEmbed()
    .setDescription("")
    .addField("Reaction Roles add", "`rradd [channel mention] [messageID] [role mention] [emoji]`")
    .addField("Reaction Roles delete", "`rrdel [channel mention] [messageID] [role mention] [emoji]`")
    .setColor("RED")
    message.channel.send(embed);
     }
}