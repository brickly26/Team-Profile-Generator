const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const fileName = "./dist/index.html";

// DATA
let htmlCards = ``;
let job = "Manager";
let finalHtml = ``;

// Questions
const Questions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    name: "id",
    message: "what is the employee's ID?"
  },
  {
    type: "input",
    name: "email",
    message: "what is the employee's email?"
  }
]

const managerQuestions = Questions.concat(
  {
    type: "input",
    name: "officeNum",
    message: "what is the Manager's office number?"
  }
);

const engineerQuestions = Questions.concat(
  {
    type: "input",
    name: "officeNum",
    message: "what is the Engineer's Github?"
  }
);

const internQuestions = Questions.concat(
  {
    type: "input",
    name: "school",
    message: "what is the Intern's school?"
  }
);

//functions
const employeeCard = (employee) => {
  let html = ``;
  const role = employee.getRole();

  switch(role) {
    case "Manager":
      html = `<div class='card'>
                <div class='card-heading'>
                    <p>${employee.name}</p>
                    <p>${role}</p>
                </div>
                <div class='card-body'>
                    <ul>
                        <li>ID: ${employee.id}</li>
                        <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                        <li>Office Number: ${employee.officeNum}</li>
                    </ul>
                </div>
              </div>`
    case "Engineer": 
      html = `<div class='card mt-5'>
                <div class='card-body' style="background-color:blue;">
                    <h5 class="card-title">${employee.name}</h5>
                    <p class="card-text">${role}</p>
                </div>
                  <ul>
                    <li>ID: ${employee.id}</li>
                    <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                    <li>Github: <a href="github.com/${employee.github}">${employee.github}</a></li>
                  </ul>
              </div>`
    case "Intern":
      html = `<div class='card'>
                <div class='card-body'>
                    <h5 class="card-title">${employee.name}</h5>
                    <p class="card-text">${role}</p>
                </div>
                  <ul>
                      <li>ID: ${employee.id}</li>
                      <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                      <li>Office Number: ${employee.school}</li>
                  </ul>
              </div>`
  }
  htmlCards += html;
}

const finalHtmlCreator = (htmlCards) => {
  finalHtml = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <link rel='stylesheet' href='./styles.css'>
      <title>Team Profile</title>
  </head>
  <body>
      <header>
          <h1 id='heading'>Team</h1>
      </header>
      <main class='container row'>
          ${htmlCards}
      </main>
  </body>
  </html>`;
}

const addEmployee = (answer, job) => {
  const name = answer.name;
  const id = answer.id;
  const email = answer.email;
  const officeNum = answer.officeNum;
  const github = answer.github;
  const school = answer.school;

  switch(job) {
    case "Manager":
      employee = new Manager(name, id, email, officeNum);
      break;
    case "Engineer":
      employee = new Engineer(name, id, email, github)
      break;
    case "Intern":
      employee = new Intern(name, id, email, school)
  }
  console.log(employee)

  employeeCard(employee);
}

const GenerateHtml = (finalHtml) => {
  fs.writeFile(fileName, finalHtml, (err) => {
    err ? console.log("Error!") : console.log("File Created!")
  })
}

const startInquirer = (questions) => {
  inquirer
  .prompt(questions)
  .then((answers) => {
    inquirer.prompt([
      {
        type: "confirm",
        name: "add",
        message: "Would you like to add another employee to the team?"
      }
    ]).then((choice) => {
      addEmployee(answers, job);
      if (choice.add) {
        inquirer.prompt([
          {
            type: "list",
            name: "newRole",
            message: "Which role would you like to add?",
            choices: ["Engineer", "Intern"]
          }
        ]).then((empChoice) => {
          const userChoice = empChoice.newRole;

          job = userChoice;

          init();
        })
      } else {
        finalHtmlCreator(htmlCards);
        GenerateHtml(finalHtml);
      }
    });
  });
}

const init = () => {
  if (job === "Manager") {
    console.log("Lets start by adding a Manager.")
    startInquirer(managerQuestions);
  } else if (job === "Engineer"){
    startInquirer(engineerQuestions);
  } else if (job === "Intern") {
    startInquirer(internQuestions);
  }

}

init();