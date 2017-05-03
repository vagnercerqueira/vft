from django.db import models

class Categoria(models.Model):		
	descricao = models.CharField('Descricao', max_length=50)	
	def __str__(self):  
		return self.descricao
	
