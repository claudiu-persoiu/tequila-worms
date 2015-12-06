directions =
  left:
    x: -1, y: 0
  right:
    x: 1, y: 0
  up:
    x: 0, y: 1
  down:
    x: 0, y: -1

getRandom = ->
  keys = Object.keys directions
  keys[Math.floor(Math.random() * keys.length)]

module.exports =
  getRandom: getRandom
  getMovementByDirection: (direction) =>
    directions[direction]
  isValidDirection: (direction) =>
    directions.hasOwnProperty(direction)
  isReverse: (oldDirection, newDirection) =>
    ((directions[oldDirection].x + directions[newDirection].x) is 0 and
      (directions[oldDirection].y + directions[newDirection].y) is 0)