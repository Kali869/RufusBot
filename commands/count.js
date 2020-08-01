const Command = require("../base/Command.js");
const countGame = new Set();

class Count extends Command {
  constructor(client) {
    super(client, {
      name: "count",
      description: "A little game where the server ahs to slowely go up in numbers, if Someone says the wrong number the game ends",
      usage: "count [Number]",
      category : "Fun",
     
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    

    const num = parseInt(args[0]);
    const helpToupper = args[0];
    const help = helpToupper.toLocaleLowerCase();
    if (help == "help") return message.reply("The way you play this game is buy slowey going up in numbers, adding one at time, if someone goes out of sink the game will end, And it will have to restarted.");
   
    if (!num) return message.channel.send("Please Specify a number");
    

    // If a game doesn't exist, add user to the Set and send message that a new game started
    if (countGame.size === 0) {
      if (num !== 1) return message.channel.send("The game must start at **1**!");
      await countGame.add(message.author.id);
      return message.channel.send(`**${message.member.user.tag}** has started a game! Current count is at **${countGame.size}**.`);
    // Is user enters incorrect number, end the game (clear the Set)
    } else if (num !== countGame.size + 1) {
      countGame.clear();
      return message.channel.send(`:frowning: **${message.member.user.tag}** has ended the game by entering **${num}**.`);
    // If a game is ongoing, add user to the Set
    } else {
      await countGame.add(message.author.id);
      return message.channel.send(`**${message.member.user.tag}** has counted! Game is now at **${countGame.size}**.`);
    }
  }
}

module.exports = Count;