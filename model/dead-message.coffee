messages = [
    " bites the dust",
    " killed himself",
    " fallowed bin laden",
    ", die die!",
    " didn't have 9 lives",
    " see you in hell",
    " has been undefined",
    " sleeps with the fish",
    " equals null"
]

module.exports = ->
    messages[Math.floor(Math.random() * messages.length)]