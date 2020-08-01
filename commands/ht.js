// const Command = require("../base/Command.js");
// const Discord = require("discord.js");
// const GuildModel = require("../Models/Guild");
// const {connect} = require("mongoose");





// class Ht extends Command {
//   constructor(client) {
//     super(client, {
//       name: "ht",
//       description: "Stores Information for you ",
//       usage: "ht [Data to be saved]",
      
      
//     });
//   }

//   async run(message, args, level) { // eslint-disable-line no-unused-vars
     
//     const Info = message.content.slice(3);
//     console.log(Info);
    
//     const UserId = message.member.id;
//     console.log(UserId);
    

//     const doc = new GuildModel({id: UserId,
      
//       User: message.member.user.username,
//       Info: Info,
//       Timestamp: message.createdAt
//     });
//     await doc.save();}
    
    
  
// }


// module.exports = Ht;
const Command = require("../base/Command.js");

const GuildModel = require("../Models/Guild");
const  aes256 = require("aes256");
const  uniqid = require("uniqid");





class Ht extends Command {
  constructor(client) {
    super(client, {
      name: "ht",
      description: "Stores Information for you ",
      usage: "ht [Data to be saved]",
      
      
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    var key = "X60dJRelaIATsiT8j1sV";
    
    const Info = message.content.slice(3);
    if (!Info) return message.channel.send("Invallid Info Provided");
    const encrypted = aes256.encrypt(key, Info);
    
    
    const UserId = message.member.id;
    
    const  Unique = uniqid();
    console.log(Unique);
    message.member.send("This is your Unique Id" + "```" + `${Unique}`+ "``` \n" + "for your message" + "``` Message:"+ `${Info}`+ "``` \n"  +  "Do not loose it or you will not have access to your message anymore.\n You can request your Info with ^gb [Unqiue Id]");
    await message.delete();

    const doc = new GuildModel({id: UserId,
      _id : Unique,
      UniqueId: Unique,
      Id: UserId,
      User: message.member.user.username,
      Info: encrypted,
      Timestamp: message.createdAt,
    });
    await doc.save();}
    
    
  
}


module.exports = Ht;