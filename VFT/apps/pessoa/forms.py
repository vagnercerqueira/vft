from django.apps import AppConfig
from django import forms
from apps.pessoa.models import Categoria


class PessoaConfig(AppConfig):
    name = 'pessoa'
	
class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ('id', 'descricao')	
