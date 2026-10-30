from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("autores/nuevo/", views.nuevo_autor, name="nuevo_autor"),
    path("libros/nuevo/", views.nuevo_libro, name="nuevo_libro"),
    path("libros/<int:libro_id>/editar/", views.editar_libro, name="editar_libro"),
    path("libros/<int:libro_id>/eliminar/", views.eliminar_libro, name="eliminar_libro"),
]