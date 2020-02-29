const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { body } = require('express-validator');
const colors = require('colors');
//import User from "./user";
const User = require ('./user.js');
const Login = require ('./login.js');



let userModel = new User();
let loginModel = new Login();

// crear servidores
const servidor = express();

//configuramos middleware
servidor.use(bodyParser.json());
//cookie-parser//middleware
servidor.use(cookieParser());

//get servidor pedidos

servidor.get('/pedidos',(req, res)=>{
    fs.readFile('data.json', (err, fileContents)=>{
        if(err) {
            res.send({"error":"Pedido no encontrado"});
            throw err;
        }
       
        let data = JSON.parse(fileContents);
        res.send(data)
    })
})

//registro de usuarios

servidor.post('/register',[
    //validator extra
    body("username").trim().isEmail(),
    body("password").trim().isEmpty()
],
(req,res)=>{

    let respuesta = userModel.register(req.body)

    res.send(respuesta)

}
)

servidor.post('/login',(req,res)=>{

    let respuesta = loginModel.logg(req.body)

    res.send(respuesta)
}
)






servidor.listen(3000, ()=>{console.log("Escuchando en el puerto 3000".zebra)})