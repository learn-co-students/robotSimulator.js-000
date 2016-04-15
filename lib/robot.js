'use strict';

function Robot() {
  // implement your solution here!
}

Robot.prototype.validOrientations = ["north", "east", "south", "west"];

Robot.prototype.orient = function(orientation) {
  if (this.validOrientations.indexOf(orientation) < 0) {
    throw new Error("Invalid Robot Bearing");
  } else {
    this.bearing = orientation;
  }
};

Robot.prototype.turnRight = function() {
  if (this.validOrientations.indexOf(this.bearing) < this.validOrientations.length - 1) {
    this.bearing = this.validOrientations[this.validOrientations.indexOf(this.bearing) + 1];
  } else {
    this.bearing = this.validOrientations[0];
  }
};

Robot.prototype.turnLeft = function() {
  if (this.validOrientations.indexOf(this.bearing) > 0) {
    this.bearing = this.validOrientations[this.validOrientations.indexOf(this.bearing) - 1];
  } else {
    this.bearing = this.validOrientations[this.validOrientations.length - 1];
  }
};

Robot.prototype.at = function(co1, co2) {
  this.coordinates = [co1, co2];
};

Robot.prototype.advance = function(advancement) {
  switch(this.bearing) {
    case "north":
      var newCoordinates = [this.coordinates[0], this.coordinates[1] + 1];
      break;
    case "east":
      var newCoordinates = [this.coordinates[0] + 1, this.coordinates[1]];
      break;
    case "south":
      var newCoordinates = [this.coordinates[0], this.coordinates[1] - 1];
      break;
    case "west":
      var newCoordinates = [this.coordinates[0] - 1, this.coordinates[1]];
      break;
  }
  this.coordinates = newCoordinates;
};

Robot.prototype.instructions = function(string) {
  var instructions = [];
  var lib = {
    "L": "turnLeft",
    "R": "turnRight",
    "A": "advance"
  };
  var replacables = /L|R|A/gi;
  string.replace(replacables, function(match) {
    instructions.push(lib[match]);
  })
  return instructions;
}

Robot.prototype.place = function(placement) {
  this.at(placement["x"],placement["y"]);
  this.bearing = placement["direction"];
};

Robot.prototype.evaluate = function(instructions) {
  var commands = this.instructions(instructions);
  for (var i = 0; i < commands.length; i++) {
    switch(commands[i]) {
      case "turnLeft":
        this.turnLeft();
        break;
      case "turnRight":
        this.turnRight();
        break;
      case "advance":
        this.advance();
        break;
    }
  }
};