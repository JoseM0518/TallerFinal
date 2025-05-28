// Espera a que todo el contenido del DOM esté cargado antes de ejecutar cargarProductos
document.addEventListener('DOMContentLoaded', cargarProductos);

// Variable para guardar el ID del producto que se va a editar
let productoEditandoId = null;

// Función para cargar los productos desde el servidor y mostrarlos en la tabla
function cargarProductos() {
    fetch('/productos') // Solicita los productos al backend
        .then(response => response.json()) // Convierte la respuesta en JSON
        .then(data => {
            const tbody = document.querySelector('#tabla-productos tbody'); // Selecciona el cuerpo de la tabla
            tbody.innerHTML = ''; // Limpia cualquier contenido previo
            data.forEach(producto => {
                // Agrega cada producto como una fila en la tabla
                tbody.innerHTML += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.descripcion}</td>
                        <td>
                            <button onclick="editarProducto(${producto.id})">Editar</button>
                            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// Función para guardar un producto (nuevo o editado)
function guardarProducto() {
    // Crea un objeto con los datos del formulario
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        descripcion: document.getElementById('descripcion').value
    };

    // Define la URL y método dependiendo si es creación o edición
    const url = productoEditandoId ? `/productos/${productoEditandoId}` : '/productos';
    const method = productoEditandoId ? 'PUT' : 'POST';

    // Envía los datos al backend con fetch
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
        // Muestra mensaje, recarga la tabla y limpia el formulario
        document.getElementById('message').textContent = data.mensaje;
        cargarProductos();
        limpiarFormulario();
        productoEditandoId = null; // Resetea el estado de edición
    });
}

// Función para cargar los datos del producto en el formulario para editar
function editarProducto(id) {
    fetch(`/productos/${id}`) // Pide al backend los datos de un producto específico
        .then(response => response.json())
        .then(producto => {
            productoEditandoId = id; // Guarda el ID del producto que se edita
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('descripcion').value = producto.descripcion;
            window.scrollTo(0, 0); // Sube la vista al inicio del documento
        });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    if (confirm('¿Eliminar este producto?')) { // Confirmación del usuario
        fetch(`/productos/${id}`, { method: 'DELETE' }) // Envia solicitud DELETE al servidor
            .then(response => response.json())
            .then(data => {
                // Muestra mensaje y recarga la tabla
                document.getElementById('message').textContent = data.mensaje;
                cargarProductos();
            });
    }
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descripcion').value = '';
    productoEditandoId = null; // Resetea el estado de edición
}
