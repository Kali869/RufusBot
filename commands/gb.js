const Command = require("../base/Command.js");

const GuildModel = require("../Models/Guild");
const  aes256 = require("aes256");

const { Message } = require("discord.js");





class gb extends Command {
  constructor(client) {
    super(client, {
      name: "gb",
      description: "Retrives Stored Info for you.  ",
      usage: "gb [Unique Id ]",
      
      
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    var key = "X60dJRelaIATsiT8j1sV";
    const Info = message.content.slice(4);
    if (Info) return message.channel.send("Invailid Info");
    const settings = this.client.getSettings(message.guild.id);

    const instance = await GuildModel.findById(Info).exec();
    if (!instance) return Message.channel.send("Invallid Unique Id");
    console.log(Info);
    if (instance.id == message.member.id) 
    {const newinfo = instance.Info;
      const decrypted = aes256.decrypt(key,newinfo);
      message.member.send("This is your Message" + "``` Message:"+ `${decrypted}`+ "``` \n"  +  `if you want your message deleted do ${settings.prefix}Di [Unique Id]` );
      console.log(message.member.id);
      message.delete();
    }
      
    else {
      message.channel.send("Sorry Only the person that Created the Info can retreive it.");
    }
    message.delete();
     
    // const encrypted = aes256.encrypt(key, Info);
    

    // const UserId = message.member.id;
    
    // const  Unique = uniqid();
    // console.log(Unique);
    

    // const doc = new GuildModel({id: UserId,
    //   UniqueId: Unique,
    //   Id: UserId,
    //   User: message.member.user.username,
    //   Info: encrypted,
    //   Timestamp: message.createdAt,
    // });
    // await doc.save();}
    
    
  
  }}


module.exports = gb;