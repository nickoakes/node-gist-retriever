#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

const banner = ` █████╗ ███████╗██████╗ ███╗   ██╗███████╗████████╗     ██████╗ ██╗███████╗████████╗    ██████╗ ███████╗████████╗██████╗ ██╗███████╗██╗   ██╗███████╗██████╗ 
██╔══██╗██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝    ██╔════╝ ██║██╔════╝╚══██╔══╝    ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝██║   ██║██╔════╝██╔══██╗
███████║███████╗██████╔╝██╔██╗ ██║█████╗     ██║       ██║  ███╗██║███████╗   ██║       ██████╔╝█████╗     ██║   ██████╔╝██║█████╗  ██║   ██║█████╗  ██████╔╝
██╔══██║╚════██║██╔═══╝ ██║╚██╗██║██╔══╝     ██║       ██║   ██║██║╚════██║   ██║       ██╔══██╗██╔══╝     ██║   ██╔══██╗██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗
██║  ██║███████║██║██╗  ██║ ╚████║███████╗   ██║       ╚██████╔╝██║███████║   ██║       ██║  ██║███████╗   ██║   ██║  ██║██║███████╗ ╚████╔╝ ███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝  ╚═══╝╚══════╝   ╚═╝        ╚═════╝ ╚═╝╚══════╝   ╚═╝       ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
                                                                                                                                                             `;

console.log(banner);

inquirer.prompt([
    {
        type: "input",
        name: "gistID",
        message: "Please enter the ID of the Gist required",
        validate(input){
            if(input != "" && input.match(/^[a-z0-9]*$/)){
                return true;
            } else{
                return "The ID entered was invalid. Please try again.";
            }
        }
    },
    {
        type: "input",
        name: "filename",
        message: "Please enter a name for the destination file (including extension)",
        validate(input){
            if(input != ""){
                return true;
            } else{
                return "Destination file name cannot be blank.";
            }
        }
    },
    {
        type: "input",
        name: "filepath",
        message: "Please enter the destination path (forward slashes; no trailing slash)",
        validate(input){
            if(input != "" && input.match(/^(.+)\/([^\/]+)$/)){
                return true;
            } else{
                return "The destination path entered was invalid. Please try again.";
            }
        }
    }
]).then(async answers => {
    const response = await axios.get(`https://api.github.com/gists/${answers.gistID}`, {
        headers:{
            'User-Agent': 'Test'
        }
    }).then(res => {
        fs.appendFile(answers.filepath + "/" + answers.filename, res.data.files[Object.keys(res.data.files)[0]].content, error => {
            
            if(error){
                throw error;
            }

            console.log("File saved!");

        })
    })
}).catch(error => {
    console.log(error);
});