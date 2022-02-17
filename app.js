const carrito = document.querySelector('#carrito'); //< querySelector porque es un solo elemnto 
const listaPrductos = document.querySelector('#lista-productos'); // la mayoria de los div van a estar en variables tipo const 
const contenedorCarrito = document.querySelector('#producto tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []

cargarEventos()
function cargarEventos(){
    listaPrductos.addEventListener('click', agregarProducto)

    carrito.addEventListener('click' , eliminarProducto)

    // mostrar localStorages en el DOM
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') ) || [];

        carritoHTML()
    })
    // Al Vaciar el carrito
   vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //resteamos el arreglo

    limpiarHTML();//eliminamos todo el html 
    });

    //    storages

   
}



function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const articulo = e.target.parentElement.parentElement;

        // console.log(e.target)

        leerDatosCurso(articulo)
    }
}

// eliminar productos
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-producto') ){
        const productoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
          console.log(articulosCarrito);

          carritoHTML()//iterar sobre el carrito y mostrar su HTML
    }
}
function leerDatosCurso(articulo){
    // console.log(articulo)

    const infoProdcto = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio span').textContent,
        id: articulo.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
   }
    // console.log(infoProdcto)

    //revisa si un elemnto ya existe en el carrito 
const existe = articulosCarrito.some( articulo => articulo.id === infoProdcto.id );
if(existe){
    //actualizamos la cantidad
    const articulos = articulosCarrito.map(articulo =>{
        if( articulo.id === infoProdcto.id ){
            articulo.cantidad++;
            return articulo;//retorna objectos actualizados 
        }else{
            return articulo;//retorna objectos no duplicados 
        }
    })
    articulosCarrito = [...articulos];
}else{
    //agregamos el curso al carrito 
    //agregar elemntos al  arreglo del carrito
articulosCarrito = [...articulosCarrito, infoProdcto];
}

carritoHTML()
console.log(articulosCarrito)

}

function carritoHTML(){

    limpiarHTML()
    articulosCarrito.forEach(articulo =>{
        const row = document.createElement('tr');
        row.innerHTML = `
               <td><img src="${articulo.imagen}" width=100></td>
               <td>${articulo.titulo}</td>
               <td>${articulo.precio}</td>
               <td>${articulo.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${articulo.id}">X</a>
               </td>
          `;
        //agrega HTML del carrito en tbody
        contenedorCarrito.appendChild(row);
    });

    //    storages
    sicronizarStorage()
}

function sicronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito))
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
         contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
       
}