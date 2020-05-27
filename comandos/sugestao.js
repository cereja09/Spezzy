const db = require('quick.db')
const p = require('../config.json')
const Discord = require('discord.js')

exports.run = async(client, message, args) => {
  let erro = new Discord.MessageEmbed()
  
  .setTitle(`Informação`)
  .setDescription("**Envie uma sugestão para melhorar o servidor**")
  .addField("**Uso**", `\`${p.prefix}sugestao <sua_sugestao>\``, true)
  .addField("**Exemplo**", `\`${p.prefix}sugestao Adicionar o cargo x\``, true)
  .addField("**Permissão necessária**", `\`Nenhuma\``)
  .setColor('GOLD')
  
  let mens = args.join(' ')
  if(!mens) {
    message.channel.send(erro)
    return undefined;
  }
  
  const embed = new Discord.MessageEmbed()
  
  .setTitle("Nova Sugestão!")
  .addField(`Autor:`, `${message.author}`)
  .addField(`Sugestão:`, mens)
  .setColor('GOLD')
  .setThumbnail(message.guild.iconURL())
  
  var canal = message.guild.channels.cache.get(db.get(`sugest_${message.guild.id}`))
  if(!canal) return message.reply("Esse servidor não possuí nenhum canal para mandar sugestões, use `s!setsugestao`")
  
  canal.send(embed)
  .then(function(msg) {
    msg.react("👍");
    msg.react("👎")
    
    message.reply(`sua sugestão foi enviada com sucesso para o canal ${canal}`)
  }).catch(function (error) {
    console.log(error)
  })
}

exports.help = {
  name: 'sugestao'
}