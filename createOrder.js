const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');


class CreateOrder{

    constructor(){

    }
    initModel() {

    }
    crearPedido(ObjData, res){

        if(( ObjData.productos !=[] && ObjData.fecha !=[] && ObjData.direccion !=[] && ObjData.precio!=[])){

            fs.readFile('data.json', 
            (err, fileContents)=>{
                if(err)  throw err;
                    //res.send({"Status": "ok", "Message": "Error al leer pedido"});
                const data = JSON.parse(fileContents)
                let id = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data["id"] > id) {
                        id = data["id"]
                    }
                    id ++;
                    
                }
               
                let newOrder = {
                    productos: [ObjData.productos],
                    fecha: ObjData['fecha'],
                    direccion: ObjData['direccion'],
                    precio: ObjData['precio'],
                    id: id ++
                }
            data.push(newOrder);

            console.log(data)
           
            
                fs.writeFile(
                    'data.json',
                   JSON.stringify(data, null, 4),
                
                   (err) => {
                       if(err) throw err;
                        res.send({"message":"Ok! Pedido Creado"})                           
                       
                       
                   })
                })
   } else {
    //respuesta al cliente
    res.send({"message": "¿Ha habido un problema al construir el body?"})
        
    }
return;
}
}
    
module.exports = CreateOrder;