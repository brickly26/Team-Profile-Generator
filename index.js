const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/assets/js/Manager");
const Engineer = require("./lib/assets/js/Emgineer");
const Intern = require("./lib/assets/js/Intern");
const filename = "./dist/index.html";

// DATA
let htmlCards = ``;
let job = "Manager";
const finalHtml = ``;

// Questions
const commonQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    name: "ID",
    message: "what is the employee's ID?"
  },
  {
    type: "input",
    name: "email",
    message: "what is the employee's email?"
  }
]

const managerQuestions = commonQuestions.concat(
  {
    type: "input",
    name: "officeNum",
    message: "what is the Manager's office number?"
  },
  {
    type: "list",
    name: "add",
    message: "Would you like you add another team member?",
    choices: ["Intern", "Engineer", "No!"]
  }
);

const engineerQuestions = commonQuestions.concat(
  {
    type: "input",
    name: "officeNum",
    message: "what is the Engineer's Github?"
  },
  {
    type: "list",
    name: "add",
    message: "Would you like you add another team member?",
    choices: ["Intern", "Engineer", "No!"]
  }
);

const internQuestions = commonQuestions.concat(
  {
    type: "input",
    name: "school",
    message: "what is the Intern's school?"
  },
  {
    type: "list",
    name: "add",
    message: "Would you like you add another team member?",
    choices: ["Intern", "Engineer", "No!"]
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
                <li>ID: ${employee.Id}</li>
                <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                <li>Office Number: ${employee.officeNum}</li>
            </ul>
        </div>
              </div>`
    case "Engineer": 
      html = `<div class='card'>
          <div class='card-heading'>
              <p>${employee.name}</p>
              <p>${role}</p>
          </div>
          <div class='card-body'>
              <ul>
                  <li>ID: ${employee.Id}</li>
                  <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                  <li>Office Number: ${employee.officeNum}</li>
              </ul>
          </div>
                </div>`
    case "Intern":
      html = `<div class='card'>
      <div class='card-heading'>
          <p>${employee.name}</p>
          <p>${role}</p>
      </div>
      <div class='card-body'>
          <ul>
              <li>ID: ${employee.Id}</li>
              <li>Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
              <li>Office Number: ${employee.officeNum}</li>
          </ul>
      </div>
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
      <link rel='stylesheet' href='./css/styles.css'>
      <title>Team Profile Generator</title>
  </head>
  <body>
      <header>
          <h1 id='heading'>My Team</h1>
      </header>
      <main class='container'>
          ${htmlCards}
      </main>
  </body>
  </html>`;
}

const addEmployee = (answer, job) => {
  const name = answer.name;
  const ID = answer.ID;
  const email = answer.email;
  const officeNum = answer.officeNum;
  const github = answer.github;
  const school = answer.school;

  switch(job) {
    case "Manager":
      employee = new (name, ID, email, officeNum);
      break;
    case "Engineer":
      employee = new Engineer(name, ID, email, github);
      break;
    case "Intern":
      employee = new Intern(name, ID, email, school)
  }

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
    const userChoice = answers.add;
    
    addEmployee(answers, job);

    job = userChoice;
    if(job === "No!") {
      finalHtmlCreator(htmlCards);
      GenerateHtml(finalHtml);
    } else {
      init();
    }
  });
}

const init = () => {
  if (job === "Manager") {
    startInquirer(managerQuestions);
  } else if (job === "Engineer"){
    startInquirer(engineerQuestions);
  } else if (job === "Intern") {
    startInquirer(internQuestions);
  }

}

init();