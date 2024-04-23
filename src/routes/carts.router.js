import { Router } from "express";
import { cartManager } from "../app.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await cartManager.newCart()
        res.json(response)

    } catch (error) {
        res.send('error creando carrito')
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProduct(cid)
        res.json(response)

    } catch (error) {
        res.send('error enviando los productos del carrito')
    }
})
// cartsRouter.post('/:cid/products/:pid', async (req, res) => {
//     const { cid, pid } = req.params;
//     try {
//         const response = await cartManager.addProductToCart(cid, pid);
//         res.send('success enviando')
//         res.json(response);  // Devolver el carrito actualizado como respuesta
//     } catch (error) {
//         res.status(500).send('Error al agregar producto: ' + error.message);
//     }
// });

 cartsRouter.post('/:cid/products/:pid' , async (req, res) => {
     const {cid, pid } = req.params
     try {
         await cartManager.addProductToCart(cid, pid)
         res.send('success enviando')
     } catch (error) {
         res.send('error al guardar product')
     }
 })

export {cartsRouter}