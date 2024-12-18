const Command = require("../base/Command.js");

class Purge extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      description: "Removes messages.",
      usage: "purge [Ammount of messages to be deleted]",
      permLevel: "Admin",
      category : "Moderation",
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars 
    
    const amount = args;
    if (!amount) return message.reply("You haven't given an amount of messages which should be deleted!"); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return message.reply("The amount parameter isn`t a number!"); // Checks if the `amount` parameter is a number. If not, the command throws an error
 
    if (amount > 100) return message.reply("You can`t delete more than 100 messages at once!"); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return message.reply("You have to delete at least 1 message!"); // Checks if the `amount` integer is smaller than 1

    await message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
      message.channel.bulkDelete(messages 
      // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      );

    }
    );
      
  
  
  }
}

module.exports = Purge;