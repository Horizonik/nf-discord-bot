const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const now = new Date();
	
var prefix = config.prefix;

// - Start -
bot.login(config.token);

// - Set the bot's online status -
bot.on("ready", () => {
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT ON');
    bot.user.setStatus("online");
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT STATUS SET.');
	bot.user.setGame("as a clan");
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT CHANGED GAME.');
});

bot.on('guildMemberAdd', member => {
	message.channel.send("Hello " + memeber.name + ", and welcome!");
});

// - Text Commands -
bot.on("message", async message => {
	if(message.content.indexOf(config.prefix) != 0) return; // checks if prefix is in the command
	if(message.author.bot) return; // won't respond to another bot
	
	const command = message.content.toLowerCase();
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: ' + message.author.name + ' command = ' + command + '')
		if(message.isMemberMentioned("215522865376788480")) // if gemesil is mentioned
		{
			message.reply("fuck off " + message.guild.members.get("215522865376788480") + ", fucking cunt!")
		}
		if(message.isMentioned(bot))
		{
			message.reply("My prefix is " + prefix);
		}
		
		if(command.startsWith(prefix + 'copycat'))
		{
			/*if(message.author.roles.has("484050877183950849")) // not working
			{*/
				if(bot.user.avatarURL != message.author.avatarURL)
					bot.user.setAvatar(message.author.avatarURL);

				var game = message.author.presence.game.name; // not working
				if(game != null)
				{
					game = game.name.toString();
					bot.user.setGame(message.author.game.name);
				}
				message.author.send("I have now taken your identity! <:dab:486173157984829443>")
			/*}
			else {
				message.reply("You don't have the correct role for this! :lol:486173222530842635");
			}*/
		}

		if(command === prefix + 'help') {
			var helpMsg = "";
			message.channel.send({embed: {
				color: 0xa39a9c,
				author: {
					name: message.author.username,
					icon_url: message.author.avatarURL
				},
				title: "Here's the **" + prefix + "help** super helpful commands:",
				fields: [{
					name: "__Role Commands__ \n",
					value: prefix + "**rolelist** - to see a list of possible roles to choose from.\n" + 
					prefix + "**togglerole (role name)** - to toggle a certain role for yourself.\n"
				  },
				  {
					name: "__Room Commands__\n",
					value: prefix + "**joinroom (channel name)** - sends a request to join a private room.\n" +
					prefix + "**createprivate (channel name)** - create your own private voice channel.\n" +
					prefix + "**togglelock (channel name)** - toggles the voice channel lock."
				  }
				],
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© nfBot"
				}
			}});
		}
		
		if(command === prefix + 'rolelist') {
			var noneCheck = 0;
			var roleMsg = "";
			if(!message.member.roles.has("484079847044284437")) // B1944
			{
				roleMsg += "• Battalion 1944\n";
				noneCheck++;
			}
			if(!message.member.roles.has("484077948563881985")) // BF
			{
				roleMsg += "• Battlefield\n";
				noneCheck++;
			}
			if(!message.member.roles.has("484078164541308931")) // CS
			{
				roleMsg += "• Counter-Strike\n";
				noneCheck++;
			}
			if(!message.member.roles.has("484366547729514511")) // DBD
			{
				roleMsg += "• Dead-By-Daylight\n";
				noneCheck++;
			}
			if(!message.member.roles.has("484078520859885601")) // RS
			{
				roleMsg += "• Rainbow-Six\n";
				noneCheck++;
			}
			if(!message.member.roles.has("484365858895036416")) // RL
			{
				roleMsg += "• Rocket-League\n";
				noneCheck++;
			}
			roleMsg += 'And don\'t forget to use the exact command syntax - **' + prefix + 'togglerole [rolename]**.';
			
			if(noneCheck != 0 && !message.member.roles.has("484051988271726595"))
			{
				message.channel.send({embed: {
					color: 0xa39a9c,
					author: {
						name: message.author.username,
						icon_url: message.author.avatarURL
					},
					title: "The roles you can assign yourself to are:",
					description: "" + roleMsg + "",
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© nfBot"
					}
				}});
			}
			else
			{
				message.channel.send({embed: {
					color: 0xa39a9c,
						author: {
						name: message.author.username,
						icon_url: message.author.avatarURL
					},
					title: "The roles you can assign yourself to are:",
					description: "• None\nYou already have all of the game roles.",
					footer: {
						icon_url: bot.user.avatarURL,
						text: "© nfBot"
					}
				}});
			}
		}
		
		if(command.startsWith(prefix + 'say')) {
			var sayMessage = message.content;
			sayMessage = sayMessage.replace(prefix + 'say', '');
			message.delete().catch(O_o=>{}); 
			message.channel.send(sayMessage);
		}
		
		if(command === prefix + 'togglerole battalion1944') {
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484079847044284437")) // if member doesn't have game role
				{
					message.member.addRole("484079847044284437").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next roles:",
						footer: {
							icon_url: "https://i.imgur.com/r0b2O5d.png",
							text: "Battalion 1944"
						}
					}});
				}
				else // if member has role game
				{
					message.member.removeRole("484079847044284437").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next roles:",
						footer: {
							icon_url: "https://i.imgur.com/r0b2O5d.png",
							text: "Battalion 1944"
						}
					}});
				}
			}
			else {
				message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "Sorry, you already have the \"All Games\" role. **!togglerole All Games** to toggle it off.",
						footer: {
							icon_url: bot.user.avatarURL,
							text: "© nfBot"
						}
					}});
			}
		}
		
		if(command === prefix + 'togglerole battlefield')
		{
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484077948563881985")) // if member doesn't have game role
				{
					message.member.addRole("484077948563881985").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next role:",
						footer: {
							icon_url: "https://i.imgur.com/6sofuME.png",
							text: "Battlefield"
						}
					}});
				}
				else // if member has role game
				{ 
					message.member.removeRole("484077948563881985").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next role:",
						footer: {
							icon_url: "https://i.imgur.com/6sofuME.png",
							text: "Battlefield"
						}
					}});
				}
			}
		}
		
		if(command === prefix + 'togglerole counter-strike')
		{
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484078164541308931")) // if member doesn't have game role
				{
					message.member.addRole("484078164541308931").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next role:",
						footer: {
							icon_url: "https://i.imgur.com/kkxdJWP.png",
							text: "Counter-Strike"
						}
					}});
				}
				else // if member has role game
				{ 
					message.member.removeRole("484078164541308931").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next role:",
						footer: {
							icon_url: "https://i.imgur.com/kkxdJWP.png",
							text: "Counter-Strike"
						}
					}});
				}
			}
		}
		
		if(command === prefix + 'togglerole dead-by-daylight')
		{
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484366547729514511")) // if member doesn't have game role
				{
					message.member.addRole("484366547729514511").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next role:",
						footer: {
							icon_url: "https://i.imgur.com/hALa7gD.jpg",
							text: "Dead-By-Daylight"
						}
					}});
				}
				else // if member has role game
				{ 
					message.member.removeRole("484366547729514511").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next role:",
						footer: {
							icon_url: "https://i.imgur.com/hALa7gD.jpg",
							text: "Dead-By-Daylight"
						}
					}});
				}
			}
		}
		
		if(command === prefix + 'togglerole rainbow-six')
		{
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484078520859885601")) // if member doesn't have game role
				{
					message.member.addRole("484078520859885601").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next role:",
						footer: {
							icon_url: "https://i.imgur.com/daHGBzu.jpg",
							text: "Rainbow-Six"
						}
					}});
				}
				else // if member has role game
				{ 
					message.member.removeRole("484078520859885601").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next role:",
						footer: {
							icon_url: "https://i.imgur.com/daHGBzu.jpg",
							text: "Rainbow-Six"
						}
					}});
				}
			}
		}
		
		if(command === prefix + 'togglerole rocket-league')
		{
			if(!message.member.roles.has("484051988271726595")) // if member doesn't have All Games role
			{
				if(!message.member.roles.has("484365858895036416")) // if member doesn't have game role
				{
					message.member.addRole("484365858895036416").catch(console.error); // add role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **added** to the next role:",
						footer: {
							icon_url: "https://i.imgur.com/ZoZy5Rh.png",
							text: "Rocket-League"
						}
					}});
				}
				else // if member has role game
				{ 
					message.member.removeRole("484365858895036416").catch(console.error); // remove role
					message.channel.send({embed: {
						color: 0xa39a9c,
						 author: {
							name: message.author.username,
							icon_url: message.author.avatarURL
						},
					title: "You have been successfully **removed** from the next role:",
						footer: {
							icon_url: "https://i.imgur.com/ZoZy5Rh.png",
							text: "Rocket-League"
						}
					}});
				}
			}
		}
});
