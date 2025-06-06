const {Client} = require("discord.js")

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {

    // Why await here? Because the ready event isn't actually ready, sometimes
    // guild information will come in *after* ready. 1s is plenty, generally,
    // for all of them to be loaded.
    // NOTE: client.wait and client.log are added by ./modules/functions.js !
    await this.client.wait(1000);

    // This loop ensures that client.appInfo always contains up to date data
    // about the app's status. This includes whether the bot is public or not,
    // its description, owner, etc. Used for the dashboard amongs other things.
    this.client.appInfo = await this.client.fetchApplication();
    setInterval( async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    // Check whether the "Default" guild settings are loaded in the enmap.
    // If they're not, write them in. This should only happen on first load.
    if (!this.client.settings.has("default")) {
      if (!this.client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
      this.client.settings.set("default", this.client.config.defaultSettings);
    }

    // Initializes the dashboard, which must be done on ready otherwise some data
    // may be missing from the dashboard. 
    require("../util/dashboard.js")(this.client);
    
    // Set the activity as the default help command + guild count.
    // NOTE: This is also set in the guildCreate and guildDelete events!
    this.client.user.setActivity(`for @${this.client.user.username} help | ${this.client.guilds.cache.size} Servers`, { type: "WATCHING" });

    // Log that we're ready to serve, so we know the bot accepts commands.
    this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.cache.size} users in ${this.client.guilds.cache.size} servers.`, "ready");  
    // const guild = Client.guilds.cache.map(g => g.id);
    // console.log(guild);
    // const chan = guild.channels.cache.find(c => c.name.startsWith("Members:") );
    // if (!chan) {
    //   guild.guild.channels
    //     .create(`Members: ${guild.guild.memberCount}`, {
    //       type: "voice"});
         
 //   }
  }
};
