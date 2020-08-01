// This event executes when a new member joins a server. Let's welcome them!

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
  // Load the guild's settings
    const settings = this.client.getSettings(member.guild.id);

    if (settings.MemberCountEnabled == "true") { 
      const chan = member.guild.channels.cache.find(c => c.name.startsWith("Members:"));
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
   
    
  
    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    // Send the welcome message to the welcome channel.
    // There's a place for more configs here.
    member.guild.channels.find(c => c.name == settings.welcomeChannel).send(welcomeMessage).catch(console.error);
    //membeCount update when someone joins
    
  }
};
