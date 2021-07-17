const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

var teamName;
var teamMembers = {
    manager:[],
    engineer:[],
    intern:[],
    employee:[]
};

var cards;

var cardTemplate = fs.readFileSync('./src/cardTemplate.html','utf8',(err)=>{
    if (err) throw err;
});
var cardTemplateFooter = fs.readFileSync('./src/cardTemplateFooter.html','utf8',(err)=>{
    if (err) throw err;
});
var mainPage = fs.readFileSync('./src/main.html','utf8',(err)=>{
    if (err) throw err;
});

function makeCard(member) {
    var temp = cardTemplate.slice();
    temp = temp.replace("{{name}}",member.name).replace("{{role}}",member.getRole()).replace("{{id}}",member.id).replace("{{email}}",member.email);
    if (member.getRole() ==="Engineer") {
        temp = temp.concat(`            <li class="list-group-item">GitHub:<a href="https://github.com/${member.github}">${member.github}</a></li>`);
    }else if (member.getRole() ==="Intern") {
        temp = temp.concat(`            <li class="list-group-item">School: ${member.school}</li>`);
    }else if (member.getRole()==="Manager") {
        temp = temp.concat(`            <li class="list-group-item">Office Number: ${member.getOfficeNumber()}</li>`);
    }
    temp = temp.concat("\n"+cardTemplateFooter +"\n");
    // console.log(temp);
    return temp;
}

function managerInfo() {
    inquirer.prompt([
        {
            name:"teamName",
            message:"Please enter a name for your team: "
        },
        {
            name:"name",
            message:"Please enter the team manager's name: "
        },
        {
            name:"id",
            message:"Please enter the manager's ID: "
        },
        {
            name:"email",
            message:"Please enter the manager's email: "
        },
        {
            name:"number",
            message:"Please enter the manager's office number: "
        }
    ]).then(data=>{
        teamMembers.manager.push(new Manager(data.name,data.id,data.email,data.number));
        teamName = data.teamName;
        console.log("\nNow lets add your team members to the website.\n");
        addMember();
    })
}

function addMember() {
    inquirer.prompt([
        {
            type:"list",
            name:"role",
            message:"Please pick a role for your employee: ",
            choices:['Engineer','Intern','Employee']
        },
        {
            name:"name",
            message:"Please enter the member's name: ",
        },
        {
            name:"id",
            message:"Please enter the member's ID: "
        },
        {
            name:"email",
            message:"Please enter the member's email: "
        },
        {
            name:"github",
            message:"Please enter the member's Github USERNAME: ",
            when: (userInput) => userInput.role ==="Engineer"
        },
        {
            name:"school",
            message:"Please enter the member's school: ",
            when: (userInput) => userInput.role ==="Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
    ]).then( data => {
        if (data.role === "Engineer") {
            teamMembers.engineer.push(new Engineer(data.name,data.id,data.email,data.github));
        }else if(data.role === "Intern"){
            teamMembers.intern.push(new Intern(data.name,data.id,data.email,data.school));
        }else{
            teamMembers.employee.push(new Employee(data.name,data.id,data.email));
        };
        if(data.newEmployee){
            addMember();
        }
        else{
            cards += makeCard(teamMembers.manager[0]);
            teamMembers.engineer.forEach(element => {
                cards += makeCard(element);
            });
            teamMembers.intern.forEach(element => {
                cards += makeCard(element);
            });
            teamMembers.employee.forEach(element => {
                cards += makeCard(element);
            });
            outputHTML();
        }
    })
}

managerInfo();

function outputHTML() {
    fs.writeFile(`./dist/${teamName}.html`,mainPage.replace("{{cards}}",cards),(err)=>{
        if(err) throw err;
        console.log("Team page successfully created! in the ./dist directory!");
    });
}