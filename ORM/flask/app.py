"""
Ejemplo práctico de ORM en Flask con Flask-SQLAlchemy
Relación: un Autor tiene muchos Libros (uno a muchos)

Ejecución:  python app.py   ->   http://127.0.0.1:5000
"""
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///biblioteca.db"
db = SQLAlchemy(app)


# ---------------------------------------------------------------
# 1. MODELOS: cada clase = una tabla, cada atributo = una columna
# ---------------------------------------------------------------
class Autor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    pais = db.Column(db.String(50))
    # autor.libros -> lista de libros del autor (sin escribir JOIN)
    libros = db.relationship("Libro", backref="autor", lazy=True,
                             cascade="all, delete-orphan")


class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    anio = db.Column(db.Integer)
    autor_id = db.Column(db.Integer, db.ForeignKey("autor.id"), nullable=False)


# ---------------------------------------------------------------
# 2. RUTAS: CRUD con el ORM (sin escribir SQL)
# ---------------------------------------------------------------

# READ  -> SELECT * FROM libro [WHERE titulo LIKE '%q%']
@app.route("/")
def index():
    q = request.args.get("q", "").strip()
    consulta = Libro.query
    if q:
        consulta = consulta.filter(Libro.titulo.ilike(f"%{q}%"))
    libros = consulta.order_by(Libro.anio).all()
    autores = Autor.query.all()
    return render_template("index.html", libros=libros, autores=autores, q=q)


# CREATE -> INSERT INTO autor (nombre, pais) VALUES (...)
@app.route("/autores/nuevo", methods=["GET", "POST"])
def nuevo_autor():
    if request.method == "POST":
        autor = Autor(nombre=request.form["nombre"], pais=request.form["pais"])
        db.session.add(autor)
        db.session.commit()
        return redirect(url_for("index"))
    return render_template("autor_form.html")


# CREATE -> INSERT INTO libro (titulo, anio, autor_id) VALUES (...)
@app.route("/libros/nuevo", methods=["GET", "POST"])
def nuevo_libro():
    if request.method == "POST":
        libro = Libro(
            titulo=request.form["titulo"],
            anio=request.form.get("anio", type=int),
            autor_id=request.form.get("autor_id", type=int),
        )
        db.session.add(libro)
        db.session.commit()
        return redirect(url_for("index"))
    return render_template("libro_form.html", libro=None, autores=Autor.query.all())


# UPDATE -> UPDATE libro SET titulo=..., anio=... WHERE id=...
@app.route("/libros/<int:libro_id>/editar", methods=["GET", "POST"])
def editar_libro(libro_id):
    libro = db.get_or_404(Libro, libro_id)
    if request.method == "POST":
        libro.titulo = request.form["titulo"]
        libro.anio = request.form.get("anio", type=int)
        libro.autor_id = request.form.get("autor_id", type=int)
        db.session.commit()
        return redirect(url_for("index"))
    return render_template("libro_form.html", libro=libro, autores=Autor.query.all())


# DELETE -> DELETE FROM libro WHERE id=...
@app.route("/libros/<int:libro_id>/eliminar", methods=["POST"])
def eliminar_libro(libro_id):
    libro = db.get_or_404(Libro, libro_id)
    db.session.delete(libro)
    db.session.commit()
    return redirect(url_for("index"))


# ---------------------------------------------------------------
# 3. Crear tablas y datos de prueba al iniciar
# ---------------------------------------------------------------
def inicializar_bd():
    db.create_all()  # Crea las tablas a partir de los modelos
    if Autor.query.count() == 0:
        garcia = Autor(nombre="Gabriel García Márquez", pais="Colombia")
        borges = Autor(nombre="Jorge Luis Borges", pais="Argentina")
        db.session.add_all([garcia, borges])
        db.session.commit()
        db.session.add_all([
            Libro(titulo="Cien años de soledad", anio=1967, autor_id=garcia.id),
            Libro(titulo="El amor en los tiempos del cólera", anio=1985, autor_id=garcia.id),
            Libro(titulo="Ficciones", anio=1944, autor_id=borges.id),
        ])
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        inicializar_bd()
    app.run(debug=True)
