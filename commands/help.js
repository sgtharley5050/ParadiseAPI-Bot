const { MessageEmbed } = require ('discord.js');

module.exports.run = async (paradise_api, message, args) => {

    let info_commands = [
        "``api.help`` - Displays this help message",
        "``api.info`` - Displays some info about the bot."
    ]

    let api_commands = [
        "``api.get`` - Get some information about a specified bot"
    ]

    message.delete().catch()

        let prefix = 'api.'

        let embed = new MessageEmbed()
          .setAuthor('Paradise API Help', paradise_api.config.embed_image)
          .setDescription('Here is a List of my Available Commands')
          .setColor(paradise_api.config.embed_color)
          .addField('Information', info_commands)
          .addField('Paradise API', api_commands)
          .setTimestamp()
          .setFooter(`Requested By: ${message.author.username}`, paradise_api.config.embed_image)

    if (!args[0]) {
        return message.channel.send(embed)
    }

    if(args[0] && paradise_api.commands.has(args[0])) {

        const cmd = paradise_api.commands.get(args[0]);

        let cmdname = cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1)

        let aliases = 'No aliases available for this command.'

        if (cmd.help.aliases.length === 0) {

            aliases = "No aliases available for this command."
        } else {
            aliases = cmd.help.aliases.join("\n")
        }

        let cmdEmbed = new MessageEmbed()
            .setAuthor(`Command: ${cmdname}`, paradise_api.config.embed_image)
            .setDescription(`Here is some info on the ${cmdname} command.`)
            .setColor(paradise_api.config.embed_color)
            .addField('Prefix', prefix, true)
            .addField('Name', cmd.help.name, true)
            .addField('Description', cmd.help.description, true)
            .addField('Category', cmd.help.category, true)
            .addField('Example', cmd.help.example, true)
            .addField('Aliases', "``" + aliases + "``")
            .setFooter('Syntax: <> = Required | [] = Optional', paradise_api.config.embed_image)

            return message.channel.send(cmdEmbed)
    }    
}

module.exports.help = {
    name: 'help',
    category: 'Information',
    aliases: ['h', 'helpme'],
    description: 'Displays my help message and a list of Commands.',
    example: 'api.help | api.help <cmd name>'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}