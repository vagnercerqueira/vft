from django.conf.urls import url

from apps.pessoa import views
urlpatterns = [
	url(r'^list_categoria/', views.list_categoria, name='list_categoria'),
	url(r'^table_categoria/', views.table_categoria, name='table_categoria'),
	#url(r'^create/', views.table_categoria, name='create_categoria')
	url(r'^categoria_create/', views.categoria_create, name='categoria_create'),
	url(r'^categoria_edit/(?P<pk>\d+)/$', views.categoria_update, name='categoria_edit'),
	#url(r'^categoria_edit/', views.categoria_update, name='categoria_edit'),
]