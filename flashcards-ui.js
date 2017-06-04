var inquirer=require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var basicCardQs = require('./basicCards.json');
var clozeCardQs = require('./clozeCards.json');
var counter=0;

function startCards() {
    inquirer.prompt([
          {
            type: "list",
            name: "cardType",
            message: "What type of card would you like to play?",
            choices: ["Basic", "Cloze"]
          }
        ]).then(function(answers) {
             if (answers.cardType==="Basic") {
                 counter=0;
                 runBasic();
             }
             else
             {
                counter=0;
                runCloze();
             }
        });
}

function runBasic() {
    if (counter<basicCardQs.length) {
        var newBasicCard = BasicCard( basicCardQs[counter].front, basicCardQs[counter].back);
        
        inquirer.prompt([
            {
                name: "question",
                message: newBasicCard.front
            }
        ]).then(function(answers) {
            if (answers.question===newBasicCard.back) {
                console.log("Correct Answer!");
                console.log("\r\n===============================================");
            }
            else {
                console.log("Incorrect.\r\nThe answer is '" + newBasicCard.back + "'.");
                console.log("\r\n===============================================");
            }
            counter++;
            runBasic();
            });
        }
        else {
            playAgain();
        }
    }

    function runCloze() {
    if (counter<clozeCardQs.length) {
        var newClozeCard = ClozeCard(clozeCardQs[counter].fullText, clozeCardQs[counter].cloze);
        
        inquirer.prompt([
            {
                name: "question",
                message: newClozeCard.partial
            }
        ]).then(function(answers) {
            if (answers.question===newClozeCard.cloze) {
                console.log("Correct Answer!");
                console.log("\r\n===============================================");
            }
            else {
                console.log("Incorrect. " + newClozeCard.fullText);
                console.log("\r\n===============================================");
            }
            counter++;
            runCloze();
            });
        }
        else {
            playAgain();
        }
    }      

  function playAgain() {
       inquirer.prompt([
            {
                type: "list",
                name: "question",
                message: "Would you like to play again?",
                choices: ["Yes","No"]
            }
        ]).then(function(answers) {
            if (answers.question==="Yes") {
                startCards();
            }
            else {
                console.log("Goodbye!");
            }
            });
  }

  startCards();

