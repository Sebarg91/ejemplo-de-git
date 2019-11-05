const inquirer = require("inquirer")

const fs = require("fs")

const rutaArchivo = __dirname + "/pedidos.json";

let pedidos = fs.readFileSync(rutaArchivo, {encoding: "utf8"});

pedidos = JSON.parse(pedidos);



let opciones = [
    {
        name: "nombre",
        type: "input",
        message: "Ingresa tu nombre",
    },
    {
        name: "telefono",
        type: "input",
        message: "Ingresa tu numero de telefono",
    },
    {
        name: "gusto",
        type: "rawlist",
        message: "Elegi el gusto de la pizza",
        choices: ["Muzzarella", "Jamon y Morron", "Calabresa", "4 quesos"]
    },
    {
        name: "tamanio",
        type: "list",
        message: "Elegi el tamaño",
        choices: ["Personal", "Mediano", "Grande"]
    },
    {
        name: "gustoDeEmpenada",
        type: "checkbox",
        message: "Elegi el tipo de empanada",
        choices: ["Carne", "Pollo", "Jamon y Queso", "Verdura", "Caprese", "Picante"]
    },
    {
        name: "para_llevar",
        type: "confirm",
        massage: "La pizza es para levar ?",
        default: false
    },
    {
        name: "direccion",
        type: "input",
        massage: "Ingresa direccion",
        when: function (respuestas) {
            return respuestas 
        },

        validate: function (respuestas) {
            if (respuestas.length < 5) {
                return "Dejanos saber tu direccion"
            }
            return true
        },
    },
    {
        name: "con_bebida",
        type: "confirm",
        default: false,
    },
    {
        name: "bebida",
        type: "list",
        message: "Que bebida queres",
        choices: ["Coca", "Fanta", "Sprite", "Agua"],
        when: function (respuesta){
            return respuesta.con_bebida
        }
    },
    {
        name: "cliente_habitual",
        type: "confirm",
        default: false 
    }
]

inquirer.prompt(opciones)
    .then(respuestas => {
        console.log(respuestas)
        console.log("=== Resumen de tu pedido ===")
        console.log("Tus datos son - Nombre: " + respuestas.nombre + " / Telefono: " + respuestas.telefono)
    
    
        let precioDelivery = 0
        if (respuestas.para_llevar) {
            precioDelivery = 20;
            console.log("Tu pedido sera entregado en: " + respuestas.direccion)
        } else {
        console.log("Nos indicaste que pasarás a retirar tu pedido")
        }


        console.log("=== Productos solicitados ===")

        console.log("Pizza: " + respuestas.gusto)

        console.log("Tamaño: " + respuestas.tamanio)
        
        
        let precioBebida = 0
        if (respuestas.con_bebida){
            precioBebida= 80;
            console.log("Bebida: " + respuestas.bebida)
        }

        if (respuestas.cliente_habitual)
        console.log("Tus tres empanadas de regalo seran")
        console.log("Carne")
        console.log("Pollo")
        console.log("Verdura")

        let precioPizza;
        let descuento;

        switch (respuestas.tamanio) {
            case "Personal":
                precioPizza = 430

                if(respuestas.con_bebida){
                    descuento = 3
                }
                break;
        
            case "Mediana":
            precioPizza = 560

            if(respuestas.con_bebida){
                descuento = 5
            }
                break;

                case "Grande":
                precioPizza = 650

                if(respuestas.con_bebida){
                    descuento = 8
                }
                break;
        }
        let fecha = new Date()

        let nuevos = {

       fecha: console.log(fecha.toLocaleDateString("en-Us", {})),

      hora: console.log(fecha.toLocaleTimeString("en-Us", {"hour12": true}))
        }

      


      let final = {
          ...respuestas,
          ...nuevos
          totalProductos:
          descuento: descuentoFinal
      }

      pedidos.push(final)

      pedidos = JSON.stringify(pedidos)

      fs.writeFileSync(rutaArchivo, pedidos)


    });

    
