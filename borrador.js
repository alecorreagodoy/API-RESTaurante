server.post("/crearPedido", (req, resp) => {
    if ((req.body.productos && req.body.fecha && req.body.direccion && req.body.precio)){

    
        fs.readFile('datos.json', (err, fileContents) => {
            if (err) throw err;
            const data = JSON.parse(fileContents);
            let id = 0;
            for (const order of data) {
                if (order["id"] > id) {
                    id = order["id"]
                }
                id ++;
            }

            let newPedido = {
                productos: [req.body.productos],
                fecha: req.body['fecha'],
                direccion: req.body['direccion'],
                precio: req.body['precio'],
                id: id ++
            }
            data.push(newPedido)

            fs.writeFile(
                'datos.json',
                JSON.stringify(data, null, 4),
                (err) => {
                    if (err) throw err;
                    resp.send({
                        "message": "Pedido recibido"
                    });
                })
        })
    } else {

        resp.send({"message": "¿Ha habido un problema al construir el body?"})
    }
    
})