import django_tables2 as dt2
from apps.pessoa.models import Categoria

class CategoriaTable(dt2.Table):
	class Meta:
		model = Categoria
		attrs = {"class": "paleblue"}
		per_page = 5