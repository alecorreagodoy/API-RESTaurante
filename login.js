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
    logg (objUser){
        
        if(objUser.body.username && objUser.body.password){
            const userData = {
                "username": objUser.body.username,
                "password": objUser.body.password
            }

            fs.readFile('users.json',(err, fileContents)=>{

                if(err) throw err;
                const data = JSON.parse(fileContents);
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
                        selects['jwt_clave'],
                        (err, token) =>{
                            if(err) throw err;
                            //crear cookie
                            res.cookie('sello', token);
                        return ({"message":"Usuarios loggeado",
                                        "message": token
                        })
                        }
                        )
                    }else{
                        return ({"Error": "usuario o contraseña incorrectas"})
                    }
                }
                )
            })

        }
        servidor.get('/endpointSecreto',(req, res)=>{
            if(req.cookies.sello){
        
                jwt.verify(req.cookies.sello,
                    secrets["jwt_clave"],
                    (err, decoded)=>{//decode es lo que guarde dentro del token, cuando desfirmo sale lo de dentro del token
                        if(err) throw err;
                        if( decoded !== undefined){
                            //TODA LA LOGICA DE ENDPOINT
                            return ({"message":"Okay! you can cross"})
                        }
                    }
                    )
            }else{
               
                return ({"message":"you shall not pass"})
            }
        })
    
    }

}

module.exports = Login; 