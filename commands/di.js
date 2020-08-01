const Command = require("../base/Command.js");

const GuildModel = require("../Models/Guild");







class Di extends Command {
  constructor(client) {
    super(client, {
      name: "di",
      description: "Deletes Stored info for you  ",
      usage: "di [Unique Id ]",
      
      
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    
    const Info = message.content.slice(4);
    
    
    const instance = GuildModel.findByIdAndRemove(Info).exec();
    if (!instance) return message.channel.send("Sorry the provided Unique Id is Invalid.");

   
    
    console.log(Info);
    
    message.member.send("You'r message has Been Deleted");
    
    
     
   
    
    
  
  }}


module.exports = Di;