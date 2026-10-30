from django.test import TestCase
from django.urls import reverse
from .models import Autor, Libro


class GestionLibrosTests(TestCase):
    def setUp(self):
        self.autor = Autor.objects.create(nombre="Gabriel García Márquez", pais="Colombia")

    def test_ruta_nuevo_libro_muestra_formulario(self):
        response = self.client.get("/libros/nuevo/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Añadir un libro")
        self.assertContains(response, 'name="titulo"')

    def test_crear_libro_desde_formulario(self):
        response = self.client.post(
            reverse("nuevo_libro"),
            {"titulo": "Cien años de soledad", "anio": "1967", "autor": self.autor.pk},
        )

        self.assertRedirects(response, reverse("index"))
        libro = Libro.objects.get(titulo="Cien años de soledad")
        self.assertEqual(libro.anio, 1967)
        self.assertEqual(libro.autor, self.autor)

    def test_editar_y_eliminar_libro(self):
        libro = Libro.objects.create(titulo="Título anterior", autor=self.autor)

        response = self.client.post(
            reverse("editar_libro", args=[libro.pk]),
            {"titulo": "Título actualizado", "anio": "2024", "autor": self.autor.pk},
        )
        self.assertRedirects(response, reverse("index"))
        libro.refresh_from_db()
        self.assertEqual(libro.titulo, "Título actualizado")
        self.assertEqual(libro.anio, 2024)

        response = self.client.post(reverse("eliminar_libro", args=[libro.pk]))
        self.assertRedirects(response, reverse("index"))
        self.assertFalse(Libro.objects.filter(pk=libro.pk).exists())
