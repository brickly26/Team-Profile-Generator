const Employee = require("./Employee")

class Engineer extends Employee {
  constructor(name, ID, email, github) {
    super(name, ID, email)
    this.email = email;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

module.export = Engineer;