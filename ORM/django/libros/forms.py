from django import forms
from .models import Autor, Libro


class AutorForm(forms.ModelForm):
    class Meta:
        model = Autor
        fields = ["nombre", "pais"]


class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = ["titulo", "anio", "autor"]