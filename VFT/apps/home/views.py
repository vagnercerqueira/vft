from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.shortcuts import render, redirect
from django.http import HttpResponse

@login_required
def dashboard(request):
    return render_to_response('home/dashboard.html')

def login(request):
	return render(request, 'home/login.html')	
@login_required
#
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return HttpResponse("1");#sucesso na operacao
            #redirect('accounts:change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'home/change_password.html', {
        'form': form
    })	
