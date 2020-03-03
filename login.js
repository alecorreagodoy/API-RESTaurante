const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');

const secretsContents = fs.readFileSync('secrets.json');

const secrets = JSON.parse(secretsContents);


class Login {
    constructor(){

    }
    initModel() {

    }
    logg (objUser, response){
        
        if(objUser.username && objUser.password){
            const userData = {
                "username": objUser.username,
                "password": objUser.password
            }

            fs.readFile('users.json',(err, fileContents)=>{

                if(err) throw err;
                /*

                Convierto el contenido del archivo en un arreglo JSON y busco el usuario de acuerdo a su username
                data es un objeto user del archivo users.json

                JSON.parse(fileContents)         arreglo de objetos usuario
                .find(                           espera un predicado de busqueda, se debe evaluar como un booleano (true o false)
                user                             es una variable que existe solo en el predicado y representa cada objeto a evaular
                => user.username === userData["username"] 
                                                 es la evaluacion que debe dar como resultado true o false
                
                Si no se encuentra usuario devuelvo mensaje de no autenticacion y 
                */ 
                const data = JSON.parse(fileContents).find(user => user.username === userData["username"]);

                if(!data){
                    response.send({"Error": "usuario o contraseña incorrectas"});
                    return;
                }

                bcrypt.compare(userData["password"],
                data["password"],
                (err, result)=>{
                    if(err) throw err;

                    if(
                        userData["username"] === data["username"]
                        &&
                        result
                    ){
                        jwt.sign({"username": userData["username"]}, 
                        secrets['jwt_clave'],
                        (err, token) =>{
                            if(err) throw err;
                            //crear cookie
                            response.cookie('sello', token);
                            response.send({"message":"Usuarios loggeado",
                                        "message": token}); 
                        }
                        )
                    }else{
                        response.send({"Error": "usuario o contraseña incorrectas"})
                    }

                    return;
                }
                )
            })

        }
       
    
    }

}

module.exports = Login; 