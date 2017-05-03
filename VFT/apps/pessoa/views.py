from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404
from apps.pessoa.models import Categoria 
from apps.pessoa.forms import CategoriaForm
from django.template.loader import render_to_string
from django.http import JsonResponse
	
def list_categoria(request):		
	return render(request, 'pessoa/list_categoria.html')	

def categoria_create(request):
    if request.method == 'POST':
        form = CategoriaForm(request.POST)
    else:
        form = CategoriaForm()
    return save_categoria_form(request, form, 'pessoa/categoria_create.html')
	

def categoria_update(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    if request.method == 'POST':
        form = CategoriaForm(request.POST, instance=categoria)
    else:
        form = CategoriaForm(instance=categoria)
    return update_categoria_form(request, form, 'pessoa/categoria_update.html')
	
	
def save_categoria_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)

def update_categoria_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            #template = table_categoria(request)
        else:
            data['form_is_valid'] = False
    else:
    	context = {'form': form}
    	data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)    	
	
def table_categoria(request):
		model = Categoria		

		#CAMPO ORDER
		field_order = request.GET.get('order', 'descricao')
		search = request.GET.get('search', '')
		categ_list = Categoria.objects.all().filter(descricao__contains=search).order_by(field_order)
		
		page = int(request.GET.get('page', '1'))

		# REGISTROS POR PAGINA
		paginator = Paginator(categ_list, 10) 
			
		try:
			categorias = paginator.page(page)
		except PageNotAnInteger:
			# If page is not an integer, deliver first page.
			categorias = paginator.page(1)
		except EmptyPage:
			# If page is out of range (e.g. 9999), deliver last page of results.
			categorias = paginator.page(paginator.num_pages)
			
		# Get the index of the current page
		index = categorias.number - 1  # edited to something easier without index
		# This value is maximum index of your pages, so the last page - 1
		max_index = len(paginator.page_range)
		# You want a range of 7, so lets calculate where to slice the list
		start_index = index - 10 if index >= 10 else 0
		end_index = index + 10 if index <= max_index - 10 else max_index
		# My new page range
		page_range = paginator.page_range[start_index:end_index]
		return render(request, 'pessoa/table_categoria.html', {'categorias': categorias, 'page_range': page_range, 'search': search, 'order': field_order})