import django_tables2 as df
from apps.pessoa.models import Categoria

class CategoriaFilter(df.FilterSet):
	class Meta:
		model = Categoria