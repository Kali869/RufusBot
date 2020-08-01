const Command = require("../base/Command.js");
const Discord = require("discord.js");
const {parse} = require("twemoji-parser");

class Enlarge extends Command {
  constructor(client) {
    super(client, {
      name: "enlarge",
      description: "Makes an Emote Bigger",
      usage: "enlarge",
      category : "Fun"
     
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const emoji = args[0];
    if (!emoji) return message.channel.send("No emoji provided!");
    const  custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Here you go.${emoji}`)
      .setColor("");

    if (custom.id) {
      embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`); 
      return message.channel.send(embed);
    }
    else {
      const parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) return message.channel.send("Invalid emoji!");

      embed.setImage(parsed[0].url);
      return message.channel.send(embed);
    }
    
  }
}

module.exports = Enlarge;