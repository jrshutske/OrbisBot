const char = require('./methods/character.js')
const say = require('./methods/say.js')
const music = require('./methods/music.js')
const slots = require('./methods/slots.js')
const greeting = require('./methods/greeting.js')
const roll = require('./methods/roll.js')
const connect = require('./methods/connect.js')
const userModel = require('./model/UsersModel.js')

const command = (msgContent) => {
  const user_id = msgContent.msg.author.id
  // create user if doesn't exist, if they do give them +5 credits
  giveCredits = (user) => {
    if (user == null ) {
      console.log("creating user")
      userModel.createUser(user_id)
    }
    else {
      userModel.updateUser(user_id, user.credits ? parseInt(user.credits) + 5 : 0);
      console.log("users credits: " + user.credits)
    }
  }
  userModel.findUser(user_id, giveCredits);
  
  switch(msgContent.ARGS[0]) {
    case "char"   : return char.main(msgContent)
    case "say"    : return say.main(msgContent)
    case "slots"  : return slots.main(msgContent)
    case "roll"   : return roll.main(msgContent)
    case "p"      :
    case "play"   : return music.play(msgContent)
    case "join"   : return music.join(msgContent)
    case "add"    : return music.add(msgContent)
    case "q"      : return music.q(msgContent)
    case "search" : return music.search(msgContent)
    case "yo"     :
    case "hi"     :
    case "sup"    :
    case "hey"    :
    case "hello"  : return greeting.greet(msgContent)
    case "connect": return connect.connectdb(msgContent)
    default:return null
  }
}

module.exports.command = command
