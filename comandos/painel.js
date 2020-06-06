const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args, prefix) => {
  let user = message.author;
  
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`apenas administradores podem ver o painel de lobby do servidor!`)
  
  if(!message.guild.me.hasPermission(["ADMINISTRATOR"])) return message.reply(`eu não tenho permissão de administrador para acessar o painel de configurações!`);
 
  let welcomechannel = db.get(`wcanal_${message.guild.id}`)
  if (welcomechannel === null) {
     welcomechannel = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
   } else {
     welcomechannel = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${welcomechannel}>`
   }
 
 let lc = db.get(`lcanal_${message.guild.id}`)
  if(lc == null) {
    lc = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
  } else {
    lc = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${lc}>`
  }
 
  let sl = db.get(`punichannel_${message.guild.id}`)
 if(sl == null) {
    sl = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
  } else {
    sl = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${sl}>`
  }

   
 let dn = db.get(`denuchannel_${message.guild.id}`)
 if(dn === null) {
    dn = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
  } else {
    dn = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${dn}>`
  } 

 
 let sug = db.get(`sugest_${message.guild.id}`)
 if(sug === null) {
    sug = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
  } else {
    sug = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${sug}>`
  }
 
 let autorole = db.get(`autorole_${message.guild.id}`)
 if(autorole === null) {
   autorole = `<:offf:715935191989878857> Desativado\n#️⃣ Cargo setado: Não definido!`
 } else {
   autorole = `<:onn:715935192266571796> Ativado\n#️⃣ Cargo setado: <@&${autorole}>`
 }
 
 let wmessage = db.get(`wmessage_${message.guild.id}`)
 if(wmessage === null) {
   wmessage = "<:offf:715935191989878857> Desativado\n#️⃣ Mensagem setada: Não definida!"
 } else {
   wmessage = `<:onn:715935192266571796> Ativado\n#️⃣ Mensagem setada: ${wmessage}`
 }
 
 let wtitle = db.get(`wtitle_${message.guild.id}`)
 if(wtitle === null) {
   wtitle = `<:offf:715935191989878857> Desativado\n#️⃣ Título setado: Não definido!`
 } else {
   wtitle = `<:onn:715935192266571796> Ativado\n#️⃣ Título setado: ${wtitle}`
 }
 
 let lmessage = db.get(`lmessage_${message.guild.id}`)
 if(lmessage === null) {
   lmessage = `<:offf:715935191989878857> Desativado\n#️⃣ Mensagem setada: Não definida!`
 } else {
   lmessage = `<:onn:715935192266571796> Ativado\n#️⃣ Mensagem setada: ${lmessage}`
 }
 
  let ltitle = db.get(`ltitle_${message.guild.id}`)
  if(ltitle === null) {
   ltitle = `<:offf:715935191989878857> Desativado\n#️⃣ Título setado: Não definido!`
 } else {
   ltitle = `<:onn:715935192266571796> Ativado\n#️⃣ Título setado: ${ltitle}`
 }

 let logCh = db.get(`logCh_${message.guild.id}`)
 if(logCh === null) {
   logCh = `<:offf:715935191989878857> Desativado\n#️⃣ Canal setado: Não definido!`
 } else {
   logCh = `<:onn:715935192266571796> Ativado\n#️⃣ Canal setado: <#${logCh}>`
 }

 //começo das embeds

      let inicial = new Discord.MessageEmbed()
      .setTitle("**Lobby**")
      .setDescription("Olá, para acessar o painel de configurações do servidor, clique na reação abaixo!")
      .setColor('BLUE')
      .setThumbnail(message.guild.iconURL())

      message.channel.send(inicial).then(msg => {
      msg.react("712475983005089852")

      let filtro = (reaction, user) => reaction.emoji.id === "712475983005089852" && user.id === message.author.id;
      let coletor = msg.createReactionCollector(filtro, {max: 3})

     coletor.on("collect", t => {
     let principal = new Discord.MessageEmbed()
     .setTitle("Painel de Configurações")
     .setDescription(`Olá ${message.author}, este é o painel configurações, aqui você terá acesso a todas as configurações do servidor! Caso queira saber como configurar cada sistema, clique nas reações abaixo!`)
     .addField(`**<a:welcome:716402285168558140> » Sistema de entrada**`, welcomechannel)
     .addField(`**<a:leave:716402286095761468> » Sistema de saída**`, lc)
     .addField(`**<a:ferramentas:716402283667128410> » Sistema de punições**`, sl)
     .addField(`**🗃️ » Sistema de logs**`, logCh)
     .addField(`**🛑 » Sistema de denúncias**`, dn)
     .addField(`**💡 » Sistema de sugestões**`, sug)
     .addField(`**<a:config:715242355837632623> » Sistema de autorole**`, autorole)
     .addField(`**» Prefixo definido**`, `\`${prefix}\``)
     .setColor('ORANGE')
     .setThumbnail(client.user.avatarURL())
     t.remove(message.author.id)

      msg.edit(principal).then(msg => {

      msg.react("716402285168558140")
      msg.react("716402286095761468")
      msg.react("716402283667128410")
      msg.react("715242355837632623")
      msg.react("💡")
      msg.react("🗃️")
      msg.react("🛑")
      msg.react("🔙")

      let filtroA = (reaction, user) => reaction.emoji.id === "716402285168558140" && user.id === message.author.id;
      let coletorA = msg.createReactionCollector(filtroA, {max: 3})

      let filtroB = (reaction, user) => reaction.emoji.id === "716402286095761468" && user.id === message.author.id;
      let coletorB = msg.createReactionCollector(filtroB, {max: 3})

      let filtroC = (reaction, user) => reaction.emoji.id === "716402283667128410" && user.id === message.author.id;
      let coletorC = msg.createReactionCollector(filtroC, {max: 3})

      let filtroD = (reaction, user) => reaction.emoji.id === "715242355837632623" && user.id === message.author.id;
      let coletorD = msg.createReactionCollector(filtroD, {max: 3})

      let filtroE = (reaction, user) => reaction.emoji.name === "💡" && user.id === message.author.id;
      let coletorE = msg.createReactionCollector(filtroE, {max: 3})

      let filtroF = (reaction, user) => reaction.emoji.name === "🗃️" && user.id === message.author.id;
      let coletorF = msg.createReactionCollector(filtroF, {max: 3})

      let filtroG = (reaction, user) => reaction.emoji.name === "🛑" && user.id === message.author.id;
      let coletorG = msg.createReactionCollector(filtroG, {max: 3})

      let filtroH = (reaction, user) => reaction.emoji.name === "🔙" && user.id === message.author.id;
      let coletorH = msg.createReactionCollector(filtroH, {max: 3})

        coletorA.on("collect", cp1 => {
        let wEmbed = new Discord.MessageEmbed()
        .setTitle("<a:welcome:716402285168558140> Sistema de entrada")
        .setDescription("Aqui você pode ver os comandos disponíveis para configurar o sistema de entrada!")
        .addField(" Canal definido:", welcomechannel)
        .addField("Mensagem definida:", wmessage)
        .addField("Título definido:", wtitle)
        .addField("Comandos disponíveis:","`" + prefix + "welcome` >> Ativa o sistema de entrada\n`" + prefix + "welcome-off` >> Desativa o sistema de entrada")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')


        msg.edit(wEmbed)
      })

        coletorB.on("collect", cp2 => {
        let lEmbed = new Discord.MessageEmbed()
        .setTitle("<a:leave:716402286095761468> Sistema de saída")
        .setDescription("Aqui você pode ver os comandos para configurar o sistema de saída")
        .addField(" Canal definido:", lc)
        .addField("Mensagem definida:", lmessage)
        .addField("Título definido:", ltitle)
        .addField("Comandos disponíveis:", "`" + prefix + "saida` >> Ativa o sistema de saída \n `" + prefix + "saida-off` >> Desativa o sistema de saida")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')

        msg.edit(lEmbed)
      })

        coletorC.on("collect", cp3 => {
        let pEmbed = new Discord.MessageEmbed()
        .setTitle("<a:ferramentas:716402283667128410> Sistema de punições")
        .setDescription("Aqui você pode ver as configurações do sistema de punições")
        .addField(" Canal definido para enviar punições:", sl)
        .addField("Comandos disponíveis:", "`" + prefix + "stafflog` >> Seta o canal que serão enviadas as punições\n `" + prefix + "punicoes-off` >> Desativa o sistema de punições")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')

        msg.edit(pEmbed)
      })

        coletorD.on("collect", cp4 => {
        let aEmbed = new Discord.MessageEmbed()
        .setTitle("<a:config:715242355837632623> Sistema de autorole")
        .addField("Cargo setado:", autorole)
        .addField("Comandos disponíveis:", "`" + prefix + "autorole` >> Seta o cargo de entrada\n `" + prefix + "autorole-off` >> Desativa o cargo de entrada")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')

        msg.edit(aEmbed)
      })

        coletorE.on("collect", cp5 => {
        let sEmbed = new Discord.MessageEmbed()
        .setTitle("💡 Sistema de sugestões")
        .setDescription("Aqui você pode ver os comandos para configurar o sistema de sugestões")
        .addField(" Canal definido:", sug)
        .addField("Comandos disponíveis:", "`" + prefix + "setsugestao` >> Ativa o sistema de sugestões \n `" + prefix + "sugestoes-off` >> Desativa o sistema de sugestões")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')

        msg.edit(sEmbed)
      })

        coletorF.on("collect", cp6 => {
        let dEmbed = new Discord.MessageEmbed()
        .setTitle("🛑 Sistema de denúncias")
        .setDescription("Aqui você pode ver os comandos disponíveis para configurar o sistema de denúncias")
        .addField(" Canal definido:", dn)
        .addField("Comandos disponíveis:", "`" + prefix + "setdenuncia` >> Ativa o sistema de denúncias \n `" + prefix + "denuncias-off` >> Desativa o sistema de sugestões")
        .setThumbnail(client.user.avatarURL())
        .setColor("ORANGE")

        msg.edit(dEmbed)
      })

        coletorG.on("collect", cp7 => {
        let logEmbed = new Discord.MessageEmbed()
        .setTitle("🗃️ Sistema de logs")
        .setDescription("Aqui você pode ver os comandos disponíveis para configurar o sistema de logs")
        .addField(" Canal definido:", logCh)
        .addField("Comandos disponíveis:", "`" + prefix + "setlogs` >> Ativa o sistema de logs \n `" + prefix + "logs-off` >> Desativa o sistema de logs")
        .setThumbnail(client.user.avatarURL())
        .setColor('ORANGE')

        msg.edit(logEmbed)
      })

      coletorH.on("collect", cp8 => {
        msg.edit(principal)
      })


    })
   })
 })
}

exports.help = {
  name: 'painel'
}