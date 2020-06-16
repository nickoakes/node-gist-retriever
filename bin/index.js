#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "gistID",
        message: "Please enter the ID of the Gist required",
        validate(input){
            return new Promise(
                (resolve, reject) => {
                    if(input != ""){
                        resolve(true);
                    } else{
                        reject(false);
                    }
                }
            )
        }
    },
    {
        type: "input",
        name: "filename",
        message: "Please enter a name for the destination file (including extension)",
        validate(input){
            return new Promise(
                (resolve, reject) => {
                    if(input != ""){
                        resolve(true);
                    } else{
                        reject(false);
                    }
                }
            )
        }
    },
    {
        type: "input",
        name: "filepath",
        message: "Please enter the destination path (without trailing slash)",
        validate(input){
            return new Promise(
                (resolve, reject) => {
                    if(input != ""){
                        resolve(true);
                    } else{
                        reject(false);
                    }
                }
            )
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