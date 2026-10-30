# Biblioteca Flask con SQLAlchemy

Aplicación web de ejemplo para administrar una biblioteca pequeña. Está construida con Flask y Flask-SQLAlchemy y muestra cómo usar un ORM para relacionar autores con libros y realizar operaciones CRUD sin escribir consultas SQL manualmente.

## Funcionalidades

- Consultar libros y autores desde la página principal.
- Buscar libros por título.
- Registrar autores.
- Registrar, editar y eliminar libros.
- Ver el autor relacionado y la cantidad de libros de cada autor.
- Crear las tablas y cargar datos de ejemplo cuando se inicia la aplicación por primera vez.

## Tecnologías

- Python
- Flask 3.1.3
- Flask-SQLAlchemy 3.1.1
- SQLite
- Plantillas Jinja y CSS

## Requisitos

- Python 3 instalado. Se recomienda Python 3.10 o posterior.
- PowerShell o una terminal compatible.
- Conexión a Internet durante la instalación de las dependencias.

Comprueba que Python y `pip` estén disponibles:

```powershell
python --version
python -m pip --version
```

## Configuración e inicio en Windows

Abre PowerShell en la carpeta del proyecto (la que contiene `app.py` y `requirements.txt`) y ejecuta estos pasos:

1. **Crea un entorno virtual** para mantener las dependencias aisladas:

   ```powershell
   python -m venv .venv
   ```

2. **Activa el entorno virtual**:

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   Si PowerShell bloquea la activación por la política de ejecución, permite scripts locales para el usuario actual y vuelve a activarlo:

   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   .\.venv\Scripts\Activate.ps1
   ```

3. **Instala las dependencias** declaradas en `requirements.txt`:

   ```powershell
   python -m pip install -r requirements.txt
   ```

4. **Inicia la aplicación**:

   ```powershell
   python app.py
   ```

5. **Abre la aplicación** en el navegador:

   [http://127.0.0.1:5000](http://127.0.0.1:5000)

Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`. Para salir del entorno virtual:

```powershell
deactivate
```

## Estructura del proyecto

```text
.
├── app.py                  # Configuración, modelos, rutas e inicialización
├── requirements.txt        # Dependencias de Python
├── instance/
│   └── biblioteca.db       # Base de datos SQLite local
├── static/
│   └── style.css           # Estilos de la aplicación
└── templates/
    ├── base.html           # Plantilla común y navegación
    ├── index.html          # Listado, búsqueda y tarjetas de autores
    ├── autor_form.html     # Formulario de alta de autores
    └── libro_form.html     # Formularios de alta y edición de libros
```

## Cómo está organizada la aplicación

### Modelos y relación

Los modelos están definidos en `app.py`:

- **`Autor`**: tiene un identificador, nombre y país.
- **`Libro`**: tiene un identificador, título, año y `autor_id`, que referencia a un autor.
- La relación es de **uno a muchos**: un autor puede tener varios libros y cada libro pertenece a un autor.
- `autor.libros` permite acceder a los libros del autor; `libro.autor` permite consultar el autor de un libro.
- La relación configura `cascade="all, delete-orphan"`: si se elimina un autor desde el ORM, también se eliminan sus libros asociados.

### Rutas principales

| Ruta | Método | Función |
|---|---|---|
| `/` | `GET` | Lista libros y autores; acepta `?q=texto` para buscar por título. |
| `/autores/nuevo` | `GET`, `POST` | Muestra y procesa el formulario de alta de autores. |
| `/libros/nuevo` | `GET`, `POST` | Muestra y procesa el formulario de alta de libros. |
| `/libros/<id>/editar` | `GET`, `POST` | Muestra y procesa la edición de un libro. |
| `/libros/<id>/eliminar` | `POST` | Elimina un libro. |

### Base de datos y datos iniciales

La aplicación configura SQLite con la URI `sqlite:///biblioteca.db`. Flask-SQLAlchemy resuelve esa ruta relativa dentro de la carpeta de instancia de Flask (`instance/`), por lo que la base de datos local es `instance/biblioteca.db`.

Al ejecutar `python app.py`, la función de inicialización crea las tablas si no existen. Si todavía no hay autores, también registra dos autores y tres libros de ejemplo. En ejecuciones posteriores conserva los datos existentes y no vuelve a insertar ese conjunto inicial.

## Uso básico

1. Desde **Inicio**, revisa el catálogo y usa el campo de búsqueda para filtrar por título.
2. Selecciona **+ Autor** para crear un autor. El nombre es obligatorio; el país es opcional.
3. Selecciona **+ Libro** para crear un libro. Indica un título y selecciona un autor existente; el año es opcional.
4. Usa **Editar** en una fila del catálogo para cambiar sus datos.
5. Usa **Eliminar** para borrar un libro. La aplicación solicita confirmación en el navegador.

Para poder asignar un libro, primero debe existir al menos un autor.

## Configuración y consideraciones

- Las dependencias y sus versiones se mantienen en `requirements.txt`.
- La URI de la base de datos se define en `app.py`, en `SQLALCHEMY_DATABASE_URI`.
- El servidor se inicia en modo de depuración (`debug=True`) para desarrollo local. No se debe exponer este modo en producción.
- La base de datos contiene datos locales de desarrollo. Conserva una copia antes de borrarla o reemplazarla.
- `db.create_all()` crea tablas nuevas, pero no migra tablas existentes cuando cambia el esquema de los modelos.
- No hay autenticación ni protección CSRF configuradas; esta aplicación es una demostración educativa, no está preparada para publicarse directamente en Internet.

## Solución de problemas

- **`python` no se reconoce**: instala Python y asegúrate de habilitar la opción para agregarlo al `PATH`; después abre una terminal nueva.
- **No se puede activar `.venv`**: aplica la política de ejecución indicada en el paso de activación o utiliza el intérprete del entorno directamente: `.\.venv\Scripts\python.exe app.py`.
- **El puerto 5000 está ocupado**: detén la otra aplicación que lo usa antes de iniciar Flask.
- **No aparecen los datos de ejemplo**: la carga se realiza solamente si la tabla de autores está vacía. Revisa los datos existentes en `instance/biblioteca.db`.
