document.addEventListener('DOMContentLoaded', () => {
    
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    if (!usuarioActivo) {
        window.location.replace('login.html');
        return;
    }
    
    const navbarUsername = document.getElementById('navbar-username');
    if (navbarUsername) {
        navbarUsername.textContent = usuarioActivo;
    }

    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const menuUsuariosBtn = document.getElementById('menu-usuarios-btn');
    const submenuCaptura = document.getElementById('submenu-captura');
    const arrowIcon = document.getElementById('arrow-icon');
    
    const userDropdownBtn = document.getElementById('user-dropdown-btn');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');
    
    const alumnoForm = document.getElementById('alumno-form');
    const inputUsername = document.getElementById('username');
    const inputNumControl = document.getElementById('num-control');
    const inputEdad = document.getElementById('edad');

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', () => sidebar.classList.remove('-translate-x-full'));
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', () => sidebar.classList.add('-translate-x-full'));

    if (menuUsuariosBtn) {
        menuUsuariosBtn.addEventListener('click', () => {
            submenuCaptura.classList.toggle('hidden');
            arrowIcon.classList.toggle('rotate-180');
        });
    }

    if (userDropdownBtn) {
        userDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
    }

    document.addEventListener('click', () => {
        if (userMenu) userMenu.classList.add('hidden');
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: '¿Cerrar sesión?',
                text: "Se dará por terminada tu sesión activa dentro de la plataforma.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0d9488',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('usuarioActivo');
                    window.location.replace('login.html');
                }
            });
        });
    }

    
    inputUsername.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    inputNumControl.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });


    inputEdad.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });


    if (alumnoForm) {
        alumnoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = inputUsername.value.trim();
            const numControl = inputNumControl.value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const edadStr = inputEdad.value.trim();
            const edad = parseInt(edadStr, 10);

            if (!username || !numControl || !email || !password || !edadStr) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Vacíos',
                    text: 'Es obligatorio llenar toda la información solicitada en la ficha del alumno.',
                    confirmButtonColor: '#0d9488'
                });
                return;
            }

            if (numControl.length !== 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Número de Control Erróneo',
                    text: `El número de control debe tener exactamente 6 dígitos (Faltan o sobran caracteres).`,
                    confirmButtonColor: '#0d9488'
                });
                return;
            }

            if (!validarCorreo(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Correo Inválido',
                    text: 'El formato de correo del alumno no cumple los estándares (ejemplo@dominio.com).',
                    confirmButtonColor: '#0d9488'
                });
                return;
            }

            if (!validarPassword(password)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Débil',
                    text: 'La contraseña del alumno debe estructurarse con mínimo 8 caracteres, combinando letras y números.',
                    confirmButtonColor: '#0d9488'
                });
                return;
            }

            if (isNaN(edad) || edad < 1 || edad > 100) {
                Swal.fire({
                    icon: 'error',
                    title: 'Edad Incongruente',
                    text: 'Por favor, introduce un rango numérico de edad válido (1 a 100 años).',
                    confirmButtonColor: '#0d9488'
                });
                return;
            }

            lanzarModalEdadCalculada(edad, username);
        });
    }

    function lanzarModalEdadCalculada(edad, nombre) {
        if (edad >= 18) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso — Mayor de Edad',
                text: `El alumno "${nombre}" cuenta con ${edad} años. Ha sido catalogado como Mayor de Edad en cumplimiento con las normativas vigentes de la institución.`,
                confirmButtonColor: '#0d9488',
                confirmButtonText: 'Finalizar Captura'
            }).then(() => {
                alumnoForm.reset();
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Registro Exitoso — Menor de Edad',
                text: `El alumno "${nombre}" cuenta con ${edad} años. Al ser Menor de Edad, el sistema estipula que requerirá registrar un tutor legal para complementar sus trámites bancarios y escolares.`,
                confirmButtonColor: '#0d9488',
                confirmButtonText: 'Finalizar Captura'
            }).then(() => {
                alumnoForm.reset();
            });
        }
    }

    function validarCorreo(correo) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
    }

    function validarPassword(p) {
        return p.length >= 8 && /[a-zA-Z]/.test(p) && /\d/.test(p);
    }
});


const opcionCapturaBtn = document.querySelector('#submenu-captura a'); 
const vistaBienvenida = document.getElementById('vista-bienvenida');
const vistaCaptura = document.getElementById('vista-captura');

if (opcionCapturaBtn) {
    opcionCapturaBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        

        vistaBienvenida.classList.add('hidden');
        vistaCaptura.classList.remove('hidden');

        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    });
}