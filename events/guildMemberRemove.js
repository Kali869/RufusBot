// This event executes when a new member joins a server. Let's welcome them!

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  
  async run(member) {
    // Load the guild's settings
    const settings = this.client.getSettings(member.guild.id);
   
    if (settings.MemberCountEnabled == "true") 
    {  const chan = member.guild.channels.cache.find(c => c.name.startsWith("Members:") );
      if (!chan) {
        return member.guild.channels
          .create(`Members: ${member.guild.memberCount}`, {
            type: "voice"});
            
      } 
      else {
        chan.setName(`Members: ${member.guild.memberCount}`);
      }}
    else {
      const dchan = member.guild.channels.cache.find(c => c.name.startsWith("Members:") );
      
      return dchan.delete();
         
            
    } 
  }
     
      
     
};

  