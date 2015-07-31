'use strict';

function Robot() {
  var directions = [ 'east', 'south', 'west', 'north' ];
  this.bearing = "east"
  this.coordinates = [0, 0]
}

Robot.prototype.orient = function(direction){
  if (direction == "east" || direction == "west" || direction == "south" || direction == "north"){
    return this.bearing = direction
  } else
    return "Invalid Robot Bearing"
};

Robot.prototype.turnLeft = function(){
  if        (this.bearing == "east")  {
    this.bearing = "north"
  } else if (this.bearing == "north") {
    this.bearing = "west"
  } else if (this.bearing == "west")  {
    this.bearing = "south"
  } else
    this.bearing = "east"
};

Robot.prototype.turnRight = function(){
  if (this.bearing == "east"){
    this.bearing = "south"
  } else if (this.bearing == "south"){
    this.bearing = "west"
  } else if (this.bearing == "west"){
    this.bearing = "north"
  } else
    this.bearing = "east"
};

Robot.prototype.at = function(xCord, yCord){
  this.coordinates[0] = xCord
  this.coordinates[1] = yCord
};

Robot.prototype.advance = function(){
  if (this.bearing == "east"){
    this.coordinates[0] = (this.coordinates[0] + 1)
  } else if (this.bearing == "south"){
    this.coordinates[1] = (this.coordinates[1] - 1)
  } else if (this.bearing == "west"){
    this.coordinates[0] = (this.coordinates[0] - 1)
  } else
    this.coordinates[1] = (this.coordinates[1] + 1)
};

Robot.prototype.instructions = function(letters){
  var map = [];
  var instructions = letters.split("")
  instructions.forEach(function(letter){
      if (letter == "L") {
      map.push("turnLeft")
    } else if (letter == "R") {
      map.push("turnRight")
    } else if (letter == "A") {
      map.push("advance")
    } else
      letter
  })
  return map
};



Robot.prototype.place = function(hash){
  this.coordinates[0] = hash["x"]
  this.coordinates[1] = hash["y"]
  this.bearing = hash.direction
  
};

Robot.prototype.evaluate  = function(letters){
  var that = this
  var instructions = letters.split("")
  instructions.forEach(function(letter){
      if (letter == "L") {
      that.turnLeft()
    } else if (letter == "R") {
      that.turnRight()
    } else if (letter == "A") {
      that.advance()
    } else
      letter
  });
};