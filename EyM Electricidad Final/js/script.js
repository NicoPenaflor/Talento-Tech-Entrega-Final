document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const procederCompra = document.getElementById('proceder-compra');
    const formularioCompra = document.getElementById('formulario-compra');
    const formCompra = document.getElementById('form-compra');
    const vaciarCarrito = document.getElementById('vaciar-carrito');


    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito.push(...JSON.parse(carritoGuardado));
            actualizarCarrito();
        }
    }


    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }


    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.nombre} 
                <button class="eliminar" data-id="${item.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });
        guardarCarrito();
    }


    document.getElementById("lista-carrito").addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("eliminar")) {
            const id = event.target.getAttribute("data-id");
            eliminarProducto(id);
        }
    });

    function eliminarProducto(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index > -1) {
            carrito.splice(index, 1); 
            actualizarCarrito(); 
        }
    }


    vaciarCarrito.addEventListener('click', () => {
        carrito.length = 0; 
        actualizarCarrito(); 
    });


    procederCompra.addEventListener('click', () => {
        if (carrito.length > 0) {
            document.getElementById('carrito').style.display = 'none';
            formularioCompra.style.display = 'block';
        } else {
            alert('Tu carrito está vacío.');
        }
    });


	formCompra.addEventListener('submit', (e) => {
		e.preventDefault();
		const datos = new FormData(formCompra);
		const datosCliente = {};
		datos.forEach((value, key) => {
			datosCliente[key] = value;
		});
		console.log('Datos del cliente:', datosCliente);
		console.log('Servicios seleccionados:', carrito);
		alert('Formulario enviado. Nos pondremos en contacto contigo pronto.');
		carrito.length = 0; // Vaciar carrito después de enviar
		actualizarCarrito();
		formCompra.reset(); // Reinicia el formulario correctamente
		formularioCompra.style.display = 'none';
		document.getElementById('carrito').style.display = 'block';
	});


    cargarCarrito();


    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const producto = e.target.closest('.producto');
            const id = producto.getAttribute('data-id');
            const nombre = producto.querySelector('h3').textContent;
            carrito.push({ id, nombre });
            actualizarCarrito();
        });
    });
});
