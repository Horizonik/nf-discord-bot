// - Setting Constants -
const Discord = require("discord.js");
const config = require("./config.json");
const mongoose = require("mongoose");

// - Other Constants -
const bot = new Discord.Client();
const now = new Date();

// - Setting Variables -
var userId;
var authorId;
var prefix = config.prefix;
let uri = "mongodb+srv://Gemesil:nolooker101@nfcluster-6bgzx.mongodb.net/test?retryWrites=true&w=majority";

// - Mongoose Connection -
mongoose.connect(uri, {useNewUrlParser: true});
var dbAdmin = mongoose.model('Admins', mongoose.Schema({_id: String}));
var dbIgnore = mongoose.model('banList', mongoose.Schema({_id: String, reason: String}));

// - Start -
bot.login(config.token);

// - Bot Status -
bot.on("ready", () => {
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT ON');
    bot.user.setStatus("online");
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT STATUS SET.');
	bot.user.setGame("my good christian girlfriend");
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: BOT SET GAME.');
});

// - Welcome Message -
bot.on('guildMemberAdd', member => {
	message.channel.send("Hello " + memeber.name + ", and welcome!");
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: WELCOMED' + member.name + '.');
});

// - Checks if message author is in admin db -
function checkAdmin(authorId) {
	if(dbAdmin.collection("Admins").find({_id: authorId}, {_id: 1}).limit(1).size() === true)
		return true; 
	else
		return false;
}

// - Checks if member is ignored by the bot -
function isIgnored(authorId) {
	if(dbIgnore.collection("banList").find({_id: authorId}, {_id: 1}) === true)
	{
		msg.reply("I'm supposed to ignore you, so hmm, no talker sorry.")
		return true;
	}
	else
		return false;
}

// - Text Commands -
bot.on("message", async message => {
	
	// Checks if prefix is in the command
	if(message.content.startsWith(config.prefix) != 0) return;

	// Checks if the message was sent by a bot
	if(message.author.bot) return; 

	// Checks if member is ignored by bot
	if(isIgnored(message.author.id)) return;

	// Setup Stuff
	message.replace(config.prefix, ""); // remove prefix
	const command = message.content.toLowerCase(); // set to lower case
	authorId = message.author.id;
	
	console.log('[' + now.toString().replace(/GMT.*/g,) + ']: ' + message.author.name + '(ID: ' + message.author.id + ') used command = ' + command + '')

	// - Admin Only Commands -
	if(checkAdmin(authorId))
	{
		// - Toggle Command -
		if(command === 'toggle help' || command === 'toggle')
		{
			message.channel.send({embed: {
				color: 0xa39a9c,
				title: "Here's the **" + prefix + "toggle** commands",
				fields: [{
					name: "__Toggle Per Command__ \n",
					value: prefix + "**toggle say** - toggles the say command.\n" + 
					prefix + "**toggle copycat** - toggles the copycat command."
				  },
				  {
					name: "__Other Admin Commands__\n",
					value: prefix + "**ignore [user mention]** - makes me ignore the user(use " + prefix + "**ig [user]** to shorten).\n" +
					prefix + "**mad [user mention]** - changes the behavior of the bot towards the user."
				  },
				  {
					name: "__Toggle Per Guild__ \n",
					value: prefix + "**toggle welcome** - toggles bot welcome to new users.\n" +
					"*More coming soonTM!*"
				  }
				],
				footer: {
					icon_url: bot.user.avatarURL,
					text: "© nfBot"
				}
			}});
		}
		
		// - Ignore Command -
		if(command.startsWith('ignore ') || command.startsWith('ig '))
		{
			// Var Decleration
			userId = command.mentions.users.first().id;
			if(userId === null) // if there are no id's
			{
				msg.reply("you didn't mention anyone.. how dare you!");
				return;
			}

			// Accounting for both command cases
			if(command.indexOf('ignore '))
				var reas = command.replace('ignore ','');
			else 
				var reas = command.replace('ig ','');

			// Setting DB
			reas = reas.replace(userId, '');
			if(authorId === userId)
			{
				msg.reply('you can\'t ignore yourself, stupid!');
			}
			else
			{
				var newIg = new dbIgnore({ _id: userId, reason: reas });
 				await newIg.save();
			}
		}

		// - Change Prefix -
		// if(command.startsWith('prefix set ') || command.startsWith('pref s '))
		// {
		//	if(command.indexOf('prefix set '))
		//		prefix = command.replace('prefix set ', '');
		//	else
		//		prefix = command.replace('pref s ', '');
		// }
	}
	else
		msg.reply('sorry but you seem to lack permissions to use that command! if you believe this is an error please contact an administrator.');

	// MAKE A TUTORIAL COMMAND THAT BRIEFLY EXPLAINS ABOUT THE BOT INCLUDING THE ORIGIN OF ITS NAME, HEELLOO IM THE WACCKKYYY NFBOT!

	// if(message.startsWith("create command ") && m.indexOf("--reply ") != -1)
  //   {
  //     var indexEnd = message.indexOf("--reply");
  //     var name = message.slice(15,indexEnd -1 );
  //     var reply = message.slice(indexEnd + 7, m.length);
  //   	var newC = await new dbCmd({name: name, reply: reply});
  //     await newC.save();
  //     msg.reply("command created, now leave me alone");
	//   }
	
	// fetch("https://icanhazdadjoke.com/", {headers: {
  //                   'Accept': 'text/plain',
  //               }}).then(Response=>{return Response.text();}).then(res=>{console.log(res);msg.reply(res)});

	// if(message == "all commands")
	// {
	// 	var commands = await dbCmd.find();
	// 	await console.log(dbCmd);
	// 	var rep = "User created commands: (prefixes: @ / alexa)\n";
	// 	await commands.forEach(data => {rep += "alexa " + data.name + "\n"})
	// 	await msg.reply(rep);
	// }
	
	// else {
	// 	//console.log(m);
	// 	var wantedCommand = await dbCmd.findOne({name: message});
	// 	//await console.log(wantedCommand);
	// 	if(wantedCommand != undefined)
	// 	{
	// 		await msg.reply(wantedCommand.reply);
	// 	}
	// 	else msg.reply('I found no results of "I am an idiot, kill me please"' + ", did you mean something else? I seriously don't care. (command not found)");
	// 	//await console.log(wantedCommand);
	// }

	// - Bot Mention -
	if(message.isMentioned(bot.user))
	{
		message.reply("my current prefix is \"" + prefix + "\".");
	}
			
	// - Copycat -
	if(command === 'copycat')
	{
		if(bot.user.avatarURL != message.author.avatarURL)
		{
			bot.user.setAvatar(message.author.avatarURL);
			message.author.send("I have now taken your identity! dab <:")
		}
	}

	// - Get the profile picture of anyone who's on the server -
	if(command.startsWith('profilepic '))
	{
		userId = command.mentions.users.first().id;
		if(userId === null) // if there are no id's
		{
			msg.reply("you didn't mention anyone.. how dare you!");
			return;
		}
		userName = command.mentions.users.first().name;
		const picEmbed = new Discord.RichEmbed()
		.setColor('#2fc236')
		.setTitle(userName + '\'s amazing profile picture:')
		.setImage(message.author.avatarURL)
		.setFooter('Sponsored by: GemPhotos - get your own picture today!', bot.user.avatarURL);

		channel.send(picEmbed);
	}

	// - Say -
	if(command.startsWith('say ')) {
		var sayMessage = message.content;
		sayMessage = sayMessage.replace('say', '');
		message.delete().catch(O_o=>{}); 
		message.channel.send(sayMessage);
	}

	// - Help -
	if(command === 'help') {
		var helpMsg = "";
		message.channel.send({embed: {
			color: 0xa39a9c,
			title: "Here's the **" + prefix + "help** super helpful commands:",
			fields: [{
				name: "__User Commands__ \n",
				value: prefix + "**copycat** - makes me take on your appearance.\n" + 
				prefix + "**say [text]** - sudo\'s me to say anything.\n"
			},
			{
			name: "__Admin-Only Commands__\n",
			value: prefix + "**toggle** - toggles many things.\n" +
			prefix + "**prefix set [text]** - changes the bot\'s prefix, character limit is 3.\n" +
			"*More to come soonTM!*"
			}
			],
			footer: {
				icon_url: bot.user.avatarURL,
				text: "© nfBot"
			}
		}});
	}
});
