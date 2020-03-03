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
const CreateOrder = require('./createOrder')



let userModel = new User();
let loginModel = new Login();
let orderModel = new CreateOrder();

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
//login usuarios y contraseña viene de class import from Login
servidor.post('/login',(req,res)=>{

    loginModel.logg(req.body, res);
    // let respuesta = loginModel.logg(req.body, res)

  
}
)
//creador de sello
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

    servidor.post('/crearPedido',(req, res)=>{
        orderModel.crearPedido(req.body, res);

    })







servidor.listen(3000, ()=>{console.log("Escuchando en el puerto 3000".zebra)})