import {promises as fs} from 'fs'


export class CartManager  {

        constructor() {
            this.path = 'cart.json';
            this.carts = [];
        }

        async getCarts () {
            try {
                const response = await fs.readFile(this.path, 'utf8');
            const responseJSON = JSON.parse(response)
            return responseJSON
            } catch (error) {
                console.error("hubo un error al intentar leer lista de productos", error)
            }
            
        }

        async getCartProduct (id){
            const carts = await this.getCarts()
            const cart = carts.find (cart => cart.id === Number(id))
            if (cart){
                return cart.products
            }else{
                console.log('Carrito no encontrado')
                return null
            }
        }
        async newCart (){
            try {
            this.carts = await this.getCarts()

            const newId = this.carts.length > 0 ? Math.max(...this.carts.map(p => p.id)) + 1 : 1;//////

            const newCart = {id: newId, products:[]}

            this.carts.push(newCart)
            
            await fs.writeFile(this.path, JSON.stringify(this.carts))
            return newCart
            } catch (error) {
                console.log("error al crear carrito" ,error)
            }
            
        }
        async addProductToCart(cart_id, product_id) {
            const carts = await this.getCarts();
        
            const numericCartId = parseInt(cart_id);
                
            const index = carts.findIndex(cart => cart.id === numericCartId);
        
            if (index !== -1) {
                const cartProducts = carts[index].products;
                const existingProductIndex = cartProducts.findIndex(product => product.product_id === product_id);
        
                if (existingProductIndex !== -1) {
                    cartProducts[existingProductIndex].quantity += 1; // incrementar cantidad
                } else {
                    cartProducts.push({ product_id: product_id, quantity: 1 }); // nuevo producto en el carrito
                }
        
                carts[index].products = cartProducts;
        
                await fs.writeFile(this.path, JSON.stringify(carts));
                console.log("Producto agregado con éxito");
            } else {
                console.log("No se encontró el carrito con ID:", numericCartId);
            }
        }
        
        
        //////////HECHO 
        //  async addProductToCart (cart_id, product_id){
        //      const carts = await this.getCarts()
        //      const index = carts.findIndex(cart => cart.id === cart_id)

        //     if (index !== -1){
        //         const cartProducts = await this.getCartProduct(cart_id)
        //         const existingProduct = cartProducts.findIndex(product => product.product_id === product_id)

        //         if (existingProduct !== -1){
        //             cartProducts[existingProduct].quantity = cartProducts[existingProduct].quantity + 1

        //         }else{
        //             cartProducts.push({product_id, quantity:1})
        //         }

        //         carts[index].products = cartProducts

        //         await fs.writeFile(this.path, JSON.stringify(carts))
        //         console.log("producto agregado con exito")
        //     }else {
        //         console.log("no se encontro el carrito")
        //     }
        // }
}