from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods, require_POST
from .forms import AutorForm, LibroForm
from .models import Autor, Libro


def index(request):
    q = request.GET.get("q", "").strip()
    libros = Libro.objects.select_related("autor").order_by("anio")
    if q:
        libros = libros.filter(titulo__icontains=q)   # WHERE titulo LIKE '%q%'
    return render(request, "libros/index.html",
                  {"libros": libros, "autores": Autor.objects.all(), "q": q})


@require_http_methods(["GET", "POST"])
def nuevo_libro(request):
    form = LibroForm(request.POST if request.method == "POST" else None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return redirect("index")
    return render(request, "libros/libro_form.html", {"form": form})


@require_http_methods(["GET", "POST"])
def editar_libro(request, libro_id):
    libro = get_object_or_404(Libro, pk=libro_id)
    form = LibroForm(request.POST if request.method == "POST" else None, instance=libro)
    if request.method == "POST" and form.is_valid():
        form.save()
        return redirect("index")
    return render(request, "libros/libro_form.html", {"form": form, "libro": libro})


@require_POST
def eliminar_libro(request, libro_id):
    get_object_or_404(Libro, pk=libro_id).delete()    # DELETE
    return redirect("index")


def nuevo_autor(request):
    form = AutorForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("index")
    return render(request, "libros/autor_form.html", {"form": form})