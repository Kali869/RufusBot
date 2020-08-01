const Command = require("../base/Command.js");
const {RichEmbed, } = require("discord.js");

class Rpoll extends Command {
  constructor(client) {
    super(client, {
      name: "rpoll",
      description: "Creates a Poll on the server",
      usage: "rpoll [Time limit] [Question]",
      permLevel: "Admin",
      category : "Moderation",
      
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    
    const Command = args[0];
    const oCommand = args;
  
   
    if (message.author.bot) return;
    if (Command.toLowerCase() === "create") {
      
      let time = oCommand[1];
      const question = oCommand.splice(2, 3).join(" ");
      console.log(question);
      const regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
      if (regex.test(time)) {
        if (time.toLowerCase().endsWith("s")) {
          time = parseInt(time.substring(0, time.indexOf("s")));
          time *= 1000;
        } 
        else if (time.toLowerCase().endsWith("m")) {
          time = parseInt(time.substring(0, time.indexOf("m")));
          time *= 60 * 1000;
        }
        else if (time.toLowerCase().endsWith("h")) {
          time = parseInt(time.substring(0, time.indexOf("h")));
          time *= 3600 * 1000;
        }
        else if (time.toLowerCase().endsWith("d")) {
          time = parseInt(time.substring(0, time.indexOf("d")));
          time *= 86400 * 1000;
        }
        const embed = new RichEmbed()
          .setTitle(question)
          .setDescription("React with 👍 or 👎")
          .setTimestamp();
        try {
          const polls = new Map();
          const userVotes = new Map();
          const filter = (reaction, user) => {
            if (user.bot) return false;
            if (['👍', '👎'].includes(reaction.emoji.name)) {
              if (polls.get(reaction.message.id).get(user.id))   return false;
              else {
                userVotes.set(user.id, reaction.emoji.name);
                return true;
              }
            }
          };
          const msg = await message.channel.send(embed);
          await msg.react('👍');
          await msg.react('👎');
          polls.set(msg.id, userVotes);
          const reactions = await msg.awaitReactions(filter, { time: time });
          const thumbsUp = reactions.get('👍');
          const thumbsDown = reactions.get('👎');
          let thumbsUpResults = 0, thumbsDownResults = 0;
          if (thumbsUp)    thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
          if (thumbsDown)  thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
          const resultsEmbed = new RichEmbed()
            .setTitle('Results')
            .setDescription(`👍 - ${thumbsUpResults} votes\n\n👎 - ${thumbsDownResults} votes\n`);
          await message.channel.send(resultsEmbed);
        }
        catch (err) {
          console.log(err);
        }
       
       
      }
    }}
}
module.exports = Rpoll ;