const Client = require('./Structures/legendJsClient.js');
const Discord = require('discord.js');
const { prefix} = require('./config.json');

const client = new Client({
	disableMentions: 'everyone',
	partials: ["REACTION", "MESSAGE", "CHANNEL"]
});

const db = require('quick.db');
client.loadCommands();
console.log('-------------------------------------');
console.log(`
Reaction Roles Bot By Bird YT
`);

console.log('-------------------------------------');
console.log(
	'made by Bird YT'
);
console.log('-------------------------------------');
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	console.log(
		`[INFO]: watching ${client.guilds.cache.size} Servers, ${
			client.channels.cache.size
		} channels & ${client.users.cache.size} users`
	);
	console.log('-------------------------------------');
	client.user.setActivity('-help', {
		type: 'WATCHING'
	});
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.members.fetch(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args, db);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  const { guild } = reaction.message;
  if (!guild) return;
  if (!guild.me.hasPermission("MANAGE_ROLES")) return;
  const member = guild.members.cache.get(user.id);
  if (!member) return;
const data = db.get(`reactions_${guild.id}_${reaction.message.id}`)
  if (!data) return;
  const reaction2 = data.find(
    (r) => r.emoji === reaction.emoji.toString()
  );
  if (!reaction2) return;
member.roles.add(reaction2.roleId).catch(err => undefined);
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  const { guild } = reaction.message;
  if (!guild) return;
  if (!guild.me.hasPermission("MANAGE_ROLES")) return;
  const member = guild.members.cache.get(user.id);
  if (!member) return;
const data = db.get(`reactions_${guild.id}_${reaction.message.id}`)
  if (!data) return;
  const reaction3 = data.find(
    (r) => r.emoji === reaction.emoji.toString()
  );
  if (!reaction3) return;
member.roles.remove(reaction3.roleId).catch(err => undefined);
});

client.login(process.env.token);
require('./mostafahany.js')()