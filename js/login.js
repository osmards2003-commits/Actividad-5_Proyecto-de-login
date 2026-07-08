document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    
    if (localStorage.getItem('usuarioActivo')) {
        window.location.replace('index.html');
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        
        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, rellena todos los campos obligatorios.',
                confirmButtonColor: '#0d9488'
            });
            return;
        }

  
        if (!validarCorreo(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Formato incorrecto',
                text: 'El correo electrónico ingresado no cuenta con un formato válido.',
                confirmButtonColor: '#0d9488'
            });
            return;
        }


        if (!validarPassword(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña no válida',
                text: 'La contraseña debe contener mínimo 8 caracteres, incluyendo letras y números.',
                confirmButtonColor: '#0d9488'
            });
            return;
        }


        localStorage.setItem('usuarioActivo', email);
        
        Swal.fire({
            icon: 'success',
            title: '¡Acceso Concedido!',
            text: 'Ingresando al panel de administración...',
            showConfirmButton: false,
            timer: 1300,
            didClose: () => {
                window.location.replace('index.html');
            }
        });
    });

    function validarCorreo(correo) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
    }

    function validarPassword(p) {
        return p.length >= 8 && /[a-zA-Z]/.test(p) && /\d/.test(p);
    }
});