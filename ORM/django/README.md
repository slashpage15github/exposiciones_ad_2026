# Biblioteca: catálogo de libros y autores

Aplicación web sencilla construida con Django para registrar autores y administrar un catálogo de libros. Permite consultar los registros, buscar libros por título y crear, editar o eliminar libros desde una interfaz en español.

## Contenido

- [Requisitos](#requisitos)
- [Instalación y configuración](#instalación-y-configuración)
- [Ejecución](#ejecución)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Pruebas](#pruebas)
- [Configuración y notas](#configuración-y-notas)

## Requisitos

- Python 3.13 recomendado. El proyecto se verificó con Python 3.13.3.
- Django 6.1.2. Esta es la versión del proyecto y con la que se verificaron las pruebas.
- pip, incluido normalmente con Python.

El repositorio no incluye `requirements.txt` ni otro manifiesto de dependencias. Django es la dependencia necesaria para ejecutar la aplicación.

## Instalación y configuración

Abre una terminal en la carpeta raíz del proyecto (la misma carpeta que contiene `manage.py`).

### Windows (PowerShell)

1. Crea un entorno virtual:

   ```powershell
   py -3.13 -m venv venv
   ```

2. Actívalo:

   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

   Si PowerShell bloquea la activación por la política de ejecución, puedes usar el ejecutable del entorno directamente, como se muestra en el paso de instalación.

3. Instala la versión de Django usada por el proyecto:

   ```powershell
   python -m pip install Django==6.1.2
   ```

   Si no activaste el entorno, ejecuta:

   ```powershell
   .\venv\Scripts\python.exe -m pip install Django==6.1.2
   ```

4. Aplica las migraciones para crear o actualizar las tablas:

   ```powershell
   python manage.py migrate
   ```

5. (Opcional) Crea un usuario para acceder al panel de administración:

   ```powershell
   python manage.py createsuperuser
   ```

### macOS o Linux

```bash
python3.13 -m venv venv
source venv/bin/activate
python -m pip install Django==6.1.2
python manage.py migrate
```

Opcionalmente, crea el usuario administrador:

```bash
python manage.py createsuperuser
```

## Ejecución

Con el entorno virtual activado, inicia el servidor de desarrollo:

```bash
python manage.py runserver
```

En Windows también puedes ejecutar `.\venv\Scripts\python.exe manage.py runserver` si no activaste el entorno.

Abre <http://127.0.0.1:8000/> en el navegador. Detén el servidor con `Ctrl+C`.

## Uso de la aplicación

| Dirección | Función |
| --- | --- |
| `/` | Lista de libros y autores; permite buscar libros por título. |
| `/libros/nuevo/` | Formulario para registrar un libro. |
| `/libros/<id>/editar/` | Formulario para editar un libro existente. |
| `/libros/<id>/eliminar/` | Elimina un libro mediante una solicitud POST. |
| `/autores/nuevo/` | Formulario para registrar un autor. |
| `/admin/` | Administración de Django para usuarios autorizados. |

Para registrar un libro primero debe existir al menos un autor, ya que el formulario de libro requiere seleccionarlo. La página principal ofrece enlaces para añadir autores y libros. Las acciones de creación y edición validan los formularios de Django y, al completarse, regresan a la página principal.

## Estructura del proyecto

```text
.
├── manage.py                 # Punto de entrada para comandos de Django
├── db.sqlite3                # Base de datos SQLite local
├── config/
│   ├── settings.py           # Aplicaciones, middleware, plantillas y base de datos
│   ├── urls.py               # Rutas principales del sitio
│   ├── asgi.py               # Entrada ASGI
│   └── wsgi.py               # Entrada WSGI
└── libros/
    ├── models.py             # Modelos Autor y Libro
    ├── forms.py              # Formularios basados en los modelos
    ├── views.py              # Consultas y operaciones de la aplicación
    ├── urls.py               # Rutas de libros y autores
    ├── admin.py              # Registro de modelos en Django Admin
    ├── tests.py              # Pruebas automatizadas
    ├── migrations/           # Historial de cambios del esquema
    └── templates/libros/     # Plantillas HTML de la interfaz
```

La configuración del proyecto vive en `config`; la funcionalidad del catálogo está en la aplicación Django `libros`. Las vistas conectan las rutas y los formularios con los modelos y las plantillas.

## Modelo de datos

- **Autor**: nombre obligatorio (hasta 100 caracteres) y país opcional (hasta 50 caracteres).
- **Libro**: título obligatorio (hasta 150 caracteres), año opcional y autor obligatorio.
- **Relación**: un autor puede tener varios libros. Cada libro pertenece a un autor. Si se elimina un autor, Django elimina también sus libros asociados (`CASCADE`).

La base de datos predeterminada es SQLite y se guarda en `db.sqlite3` en la raíz del proyecto. Django crea y actualiza las tablas a partir de las migraciones; no es necesario instalar un servidor de base de datos aparte para el desarrollo local.

## Pruebas

Ejecuta la suite de pruebas desde la raíz:

```bash
python manage.py test
```

La suite actual comprueba que se muestre el formulario de libro, que se pueda crear un libro y que las operaciones de edición y eliminación funcionen. Para revisar la configuración de Django ejecuta:

```bash
python manage.py check
```

## Configuración y notas

La configuración principal está en `config/settings.py`:

- `INSTALLED_APPS` incluye las aplicaciones integradas de Django y `libros`.
- `DATABASES` configura SQLite con la base `db.sqlite3`.
- `LANGUAGE_CODE` está en español (`es`) y la zona horaria es UTC.
- `DEBUG` está habilitado para desarrollo y `ALLOWED_HOSTS` está vacío.
- Las plantillas se descubren dentro de las aplicaciones con `APP_DIRS = True`.

**Antes de publicar la aplicación en un servidor**, configura una `SECRET_KEY` privada mediante variables de entorno, desactiva `DEBUG`, establece `ALLOWED_HOSTS` con los dominios permitidos y sigue la lista de comprobación de despliegue de Django. La configuración actual es para desarrollo local, no para producción. No compartas la clave secreta ni la base de datos si contiene datos privados.
