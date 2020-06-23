
require('dotenv').config()

const mysql = require("mysql");
const inquirer = require("inquirer");



// Database Class
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }


// Access SQL Database
const db = new Database({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    insecureAuth : true
});


// PROMPTS //

async function bidItem() {
    const submittedBid = await inquirer.prompt ([
    {
        type: "list",
        message: "Which item would you like to bid on?",
        choices: [""],
        name: "items"
    },
    {
        type: "input",
        message: "How much would you like to bid?",
        name: "bid"
    }])
    console.log("You have successfully bid on this item!");
    return submittedBid;
}
async function initialPrompt() {
    const initialize = await inquirer.prompt (
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["Post an item", "Bid on an item"],
        name: "action"
    })
    return initialize;
}

async function postItem() {
    const postedItem = await inquirer.prompt ([
    {
        type: "input",
        message: "What item would you like to post?",
        name: "post"
    },
    {
        type: "input",
        message: "Please enter a brief description of the item:",
        name: "description"
    }])
    console.log("Your item has been successfully posted!");
    return postedItem;
}

async function bidItem() {
    const submittedBid = await inquirer.prompt ([
    {
        type: "list",
        message: "Which item would you like to bid on?",
        choices: [""],
        name: "items"
    },
    {
        type: "input",
        message: "How much would you like to bid?",
        name: "bid"
    }])
    console.log("You have successfully bid on this item!");
    return submittedBid;
}

async function mainApp() {
    let startup = await initialPrompt()
    console.log(startup.action)
    if (startup.action == "Post an item") {
        let post = await postItem()
        console.log(post.post);
        console.log(post.description); 
    } else {
        console.log("You have chosen BID.")
        let bid = await bidItem()
        console.log(bid.items);
        console.log(bid.bid);
    }
}

mainApp();