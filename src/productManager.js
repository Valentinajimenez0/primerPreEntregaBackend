//const fs = require('fs').promises;
import {promises as fs} from 'fs';



export class ProductManager {

    constructor() {
        this.products = [];
        this.path = "products.json";
    }



    async addProduct({title, description, price, thumbnail, code, stock, status, category}) {
        const products = await this.getProducts();

        // Verifica que todos los campos requeridos están presentes y no son vacíos
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Error: Todos los campos son obligatorios.");
        return null;
    }

    // Verifica si algún producto ya tiene el mismo código
    if (products.some(product => product.code === code)) {
        console.log("Error: Ya existe un producto con el mismo código.");
        return null;
    }

        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

        let newProduct = { id: newId, title, description, price, thumbnail, code, stock, status, category };

        this.products = await this.getProducts()
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }

    async getProducts () {
     const response = await fs.readFile(this.path, 'utf8')
     const responseJSON = JSON.parse(response)
     return responseJSON
    }

    // async getProductById(id) {
    //          const products = await this.getProducts(); 
    //          const productoEncontrado = products.find((prod) => prod.id === id);
    //          if (!productoEncontrado) {
    //              console.log("Error: Not found, producto no encontrado");
    //              return undefined;
    //          }
    //          return productoEncontrado;
    //      }
    async getProductById(id) {
        const products = await this.getProducts();
        // Convertir id a número para la comparación
        const productId = parseInt(id, 10);
        const productoEncontrado = products.find((prod) => prod.id === productId);
        if (!productoEncontrado) {
            console.log("Error: Not found, producto no encontrado");
            return undefined;
        }
        return productoEncontrado;
    }
    async updateProduct(id, {...newData}) {
        let products = await this.getProducts();
        const productId = parseInt(id, 10);
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products[productIndex] = { id: productId, ...newData };
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[productIndex];
        } else {
            console.log("Producto no encontrado.");
            return null;
        }
    }
    
    async deleteProduct(id) {
        let products = await this.getProducts();
        const productId = parseInt(id, 10);
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
            console.log(`Producto con id ${id} ha sido eliminado.`);
        } else {
            console.log("Producto no encontrado para eliminar.");
        }
    }
    // async updateProduct(id, {...newData}) {
    //          let products = await this.getProducts();
    //          const productIndex = products.findIndex(p => p.id === parseInt(id));
    //          if (productIndex !== -1) {
    //              products[productIndex] = { id, ...newData };
    //              await fs.writeFile(this.path, JSON.stringify(products));
    //              return products[productIndex];
    //          } else {
    //              console.log("Producto no encontrado.");
    //              return null;
    //          }
    //      }

    //      async deleteProduct(id) {
    //              let products = await this.getProducts();
    //              const productIndex = products.findIndex(p => p.id === parseInt(id));
    //              if (productIndex !== -1) {
    //                  products.splice(productIndex, 1);
    //                  await fs.writeFile(this.path, JSON.stringify(products));
    //                  console.log(`Producto con id ${id} ha sido eliminado.`);
    //              } else {
    //                  console.log("Producto no encontrado para eliminar.");
    //              }
    //          }

   
}

