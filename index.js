const inquirer = require("inquirer");
const fs = require("fs");

class Employee {
  constructor(name, ID, email) {
    this.name = name;
    this.ID = ID;
    this.email = email;
  }
}

class TeamManager extends Employee {
  constructor(name, ID, email, officeNum){
  super(name, ID, email);
  this.officeNum = officeNum;
  }
}

class Engineer extends Employee {
  constructor(name, ID, email, github) {
    super(name, ID, email)
    this.email = email;
  }
}

class Intern extends Employee {
  constructor(name, ID, email, school) {
    super(name, ID, email)
    this.school = school;
  }
}


const Burak = new TeamManager("burak", 26, "burak@burak.org", 2634)

console.log(Burak)