$(document).ready(function() {
    $('#agregarBtn').click(function() {
        const tarea = $('#tareaInput').val().trim();
        if (tarea === '') {
            alert('Por favor, escribe una tarea');
            return;
        }
        const nuevaTarea = $('<li>').text(tarea).append(
                $('<button>').text('Eliminar').addClass('eliminar-btn').click(function() {
                        $(this).parent().fadeOut(300, function() {
                            $(this).remove();
                        });
                    })
            ).hide().fadeIn(500);
        $('#listaTareas').append(nuevaTarea);
        $('#tareaInput').val('');
    });
    $('.eliminar-btn').click(function() {
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
        });
    });
    $('#cajaAnimada').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 10px 30px rgba(0,0,0,0.3)'
            });
            $(this).find('p').text('¡Estás aquí!');
        },
        function() {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': 'none'
            });
            $(this).find('p').text('Pasa el mouse aquí');
        }
    );
    $('#toggleBtn').click(function() {
        $('#cajaAnimada').toggle(400);
    });
    $('#fadeBtn').click(function() {
        $('#cajaAnimada').fadeToggle(600);
    });
    $('#slideBtn').click(function() {
        $('#cajaAnimada').slideToggle(500);
    });
    let contador = 0;
    $('#contarBtn').click(function() {
        contador++;
        $('#contador').text(contador).css('color', contador > 5 ? '#dc3545' : '#667eea').animate({ fontSize: '2.5em' }, 200)
        .animate({ fontSize: '2em' }, 200);
    });
    $('#resetBtn').click(function() {
        contador = 0;
        $('#contador').text(0).css('color', '#667eea');
    });
    $('.card').dblclick(function() {
        $(this).css('border-color', '#667eea').animate({ opacity: 0.7 }, 200).animate({ opacity: 1 }, 200);
    });
    $('#cargarUsuarios').click(function() {
        $('#resultadoUsuarios').html('<p class="loading">Cargando usuarios...</p>');
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            dataType: 'json',
            timeout: 5000
        }).done(function(usuarios) {
            let html = '<h3>Lista de usuarios</h3><ul>';
            usuarios.slice(0, 5).forEach(function(user) {
                html += `<li>
                    <strong>${user.name}</strong> 
                    <span style="color:#666; font-size:14px;">(${user.email})</span>
                    <br><small>${user.phone}</small>
                    <br><small>${user.company.name}</small>
                </li>`;
            });
            html += '</ul>';
            $('#resultadoUsuarios').html(html);
        }).fail(function(error) {
            $('#resultadoUsuarios').html(`
                <p style="color:red;">Error al cargar usuarios</p>
                <small>${error.statusText || 'Error de conexión'}</small>
            `);
        });
    });
    $('#crearPost').click(function() {
        const titulo = $('#postTitulo').val().trim() || 'Título por defecto';
        const cuerpo = $('#postCuerpo').val().trim() || 'Contenido por defecto';
        const nuevoPost = {
            title: titulo,
            body: cuerpo,
            userId: 1
        };
        $('#resultadoPost').html('<p class="loading">Enviando datos...</p>');
        $.post({
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: nuevoPost,
            dataType: 'json'
        })
        .done(function(respuesta) {
            $('#resultadoPost').html(`
                <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                    <h4 style="color:#155724;">¡Post creado exitosamente!</h4>
                    <p><strong>ID:</strong> ${respuesta.id}</p>
                    <p><strong>Título:</strong> ${respuesta.title}</p>
                    <p><strong>Contenido:</strong> ${respuesta.body}</p>
                </div>
            `);
            $('#postTitulo').val('');
            $('#postCuerpo').val('');
        })
        .fail(function(error) {
            $('#resultadoPost').html(`
                <p style="color:red;">Error al crear el post</p>
                <small>${error.statusText || 'Error de conexión'}</small>
            `);
        });
    });
    $('#cargarHTML').click(function() {
        $('#contenidoCargado').html('<p class="loading">Cargando contenido...</p>');
        $('#contenidoCargado').load('https://jsonplaceholder.typicode.com/posts/1', function(response, status, xhr) {
            if (status === 'error') {
                $(this).html(`
                    <p style="color:red;">Error al cargar el contenido</p>
                    <small>${xhr.statusText || 'Error de conexión'}</small>
                `);
            } else {
                try {
                    const data = JSON.parse(response);
                    $(this).html(`
                        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                            <h4>📄 Post #${data.id}</h4>
                            <h3 style="color:#333;">${data.title}</h3>
                            <p>${data.body}</p>
                            <small style="color:#666;"> Usuario ID: ${data.userId}</small>
                        </div>
                    `);
                } catch(e) {
                    $(this).html(`
                        <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
                            <p>Contenido cargado:</p>
                            <pre style="background:#f8f9fa; padding:10px; border-radius:4px;">${response.substring(0, 200)}...</pre>
                        </div>
                    `);
                }
            }
        });
    });
    $('#cargarMultiple').click(function() {
        const peticion1 = $.get('https://jsonplaceholder.typicode.com/posts/1');
        const peticion2 = $.get('https://jsonplaceholder.typicode.com/posts/2');
        const peticion3 = $.get('https://jsonplaceholder.typicode.com/posts/3');
        $('#resultadoMultiple').html('<p class="loading">Cargando 3 posts en paralelo...</p>');
        $.when(peticion1, peticion2, peticion3)
            .done(function(res1, res2, res3) {
                const posts = [res1[0], res2[0], res3[0]];
                let html = '<h4>Posts cargados en paralelo</h4><ul>';
                posts.forEach(function(post) {
                    html += `<li>
                        <strong>${post.title}</strong>
                        <br><small>${post.body.substring(0, 80)}...</small>
                    </li>`;
                });
                html += '</ul>';
                $('#resultadoMultiple').html(html);
            })
            .fail(function() {
                $('#resultadoMultiple').html(`
                    <p style="color:red;">Error al cargar uno o más posts</p>
                    <small>Intenta de nuevo</small>
                `);
            });
    });
    $('#limpiarResultados').click(function() {
        $('.resultado-box').html('');
    });
    $('#postTitulo, #postCuerpo').keypress(function(e) {
        if (e.which === 13) {
            $('#crearPost').click();
        }
    });
});