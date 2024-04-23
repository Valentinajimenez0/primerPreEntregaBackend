import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)

    } catch (error) {
        console.error(error)
        res.send("error al cargar los productos")
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.send(`error al cargar los product ${pid}`)
    }

})
productsRouter.post('/', async (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })
        if (!response) {
            return res.status(400).send("No se pudo agregar el producto. Verifique que todos los campos estén completos y el código sea único.");/// probar esto
        }
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`error al agregar producto`)
    }
})
productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category } = req.body
        const response = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`error al agregar producto`)
    }
})
productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        await productManager.deleteProduct(pid);
        res.send(`success al eliminar producto `)
    } catch (error) {
        console.log(error)
        res.send(`error al eliminar el producto `)
    }
})



export { productsRouter }

