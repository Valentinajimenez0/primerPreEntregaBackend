 # RUTA PRODUCTS
   ## METODO POST
- se agrega un producto con el metodo post, y se guarda en nuestros products.json

![2](https://github.com/Valentinajimenez0/primerPreEntregaBackend/assets/134071168/0836dd23-0af7-4808-baf7-08c64fd4e10f)


- se agrega otro producto y si quiero repetir la peticion, de agregar el mismo producto, no te deja por tener el mismo code

![alt text](image-9.png)
![alt text](<Captura de pantalla 2024-04-23 001929.png>)
![alt text](image-10.png)

   ## METODO GET

- se obtienen todos los productos del carrito

![alt text](<Captura de pantalla 2024-04-23 002222.png>)

- se obtiene un producto en especifico enviando su ID

![alt text](<Captura de pantalla 2024-04-23 002352.png>)

### utilizamos limit con get
![alt text](image-11.png)

   ## METODO PUT

- se modifica el nombre del producto con ID 1 

   ![alt text](<Captura de pantalla 2024-04-23 002943.png>)![alt text](<Captura de pantalla 2024-04-23 003022.png>) 

   ## METODO DELETE

  - Se elimina el producto pasandole por parametro el ID 

![alt text](<Captura de pantalla 2024-04-23 003330.png>)![alt text](<Captura de pantalla 2024-04-23 003408.png>) 



  # RUTA CARTS
  ## METODO POST
- genero un carrito nuevo, que automaticamente se le coloca un ID del tipo number

![alt text](image.png)![alt text](image-1.png)

- apreto send tres veces mas para crear tres carritos distintos, pero el ID se incrementa con cada carrito, generadon que cada uno tenga su propio ID 

![alt text](image-2.png)

- agrego un producto llamado "producto nuevo" al carrito con ID 2 

![alt text](image-3.png)![alt text](image-4.png)


- si agrego el mismo producto, se incrementa la quantity

![alt text](image-5.png)
![alt text](image-6.png)

 ## METODO GET

 obtengo con el metodo GET el carrito con ID 2 y me muestra que contiene 3 cantidades de un producto.

 ![alt text](image-7.png)
