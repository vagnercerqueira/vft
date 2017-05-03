    
	//Alteracao de senha  
	var saveFormSenha = function () {
        var form = $(this);
		  $.ajax({
          url: form.attr("action"),
          data: form.serialize(),
          type: 'post',
          type: form.attr("method"),
          dataType: 'text',
          success: function (data) {
            if (data == "1") { 
              $("#call_modal_change_password .modal-body").html("<h4 style='color: blue; text-align: center;'>Senha Alterada com sucesso!</h4>");
            }
            else { 
              $("#call_modal_change_password .modal-body").html(data);
            }
          }
        });
        return false;
      };

	
   $(".change_password").click(function(){     
       $('.modal_change_password').modal('show');               
          $.ajax({
            url: $(this).attr("data-url"),
            type: 'get',
            dataType: 'text',
            beforeSend: function () {
              $("#call_modal_change_password .modal-body").html("");          
            },
            success: function (data) {
			  $('#call_modal_change_password').modal('show');
              $("#call_modal_change_password .modal-body").html(data);
              $('.modal_change_password').modal('show');            
            }
          });
      });
    
      $("#call_modal_change_password .modal-body").on("submit", "form", saveFormSenha);	

	//Alteracao ajax table
	function ajax_table(url, form_destino, page, search, order){
	    
		$.ajax({
			url: url,
			type: "get",
			data: {
				search: search,
				page: page,
				order: order
			},
			dataType: "text",
			beforeSend: function(){},
			complete: function(){},      
			success: function (data) {
				$(form_destino).html(data);
			},		
			error: function (jqXHR, textStatus){
				alert("Erro no Servidor, Requisicao falhou: " + textStatus);
			}        
		});	
		return false;	
	}			
		
	$("form").on("click", ".btn_ajax_table", function(){ 
		call_datatable($(this));
	});

	 $("form.form_crud").submit(function(e){ 

	  	id = $(this).closest("form").attr("id");	  		
	  	var form = document.getElementById(id);
	 	var focused = document.activeElement;
	 	str = focused.className;
	 	var n = str.search("search_ajax_table");
	 	if( n >= 0){
	 		call_datatable($(this));	
	 	}
		return false;
	  });	
	
	function call_datatable(alvo){
		var form_pai = "#"+(alvo.closest("form").attr("id"));
		
		var page = alvo.attr("page");
		if(page == 'undefined' || page == undefined || page == '')
			page = $(form_pai+" li.active").attr('page');
		
		var search = $(form_pai+" .search_ajax_table").val();
		
		var order = $(form_pai+" .table_crud tr.col_order").attr('order');	
		
		var url = $(form_pai+" .table_crud").attr('url');		
		
		ajax_table(url, form_pai, page, search, order);
	}

	//$("form.form_crud").on('submit',function(e){ return false; });

	$("form.form_crud").on('click', '.table_crud thead th',function(e){
		var str_parent = $(this).closest('tr'); 
		var str = str_parent.attr("order");  
		var n = str.search("-");  ;
		n === -1 ? str_parent.attr("order", "-"+ str ) : str_parent.attr('order', (str.replace('-', '', str)));
		call_datatable($(this));
	});
	
	$("form").on("click", ".btn_listagem",function(){
		alvo = $(this);
		var url = alvo.attr("data-url");
		var formulario = ("#"+(alvo.closest("form").attr("id")));		
		ajax_table(url, formulario);
	});
	$("form").on("focusout", ".search_ajax_table", function(e){
		call_datatable($(this));
		return false;
		
	});	
	//CRUD INSERT
	  
	var loadFormCreate = function (url, formulario, methodo) { 
		$.ajax({
		  url: url,
		  type: methodo,
		  dataType: 'json',
		  data: $(formulario).serialize(),
		  beforeSend: function () {			
			$(formulario+" button").attr("disabled","disabled");
		  },
		  complete: function(){},
		  success: function (data) {
			$(formulario).html(data.html_form);
		  	if(data.form_is_valid === true){
		  		$(formulario+" .alert").show().fadeOut( 4000 );	
		  	}
		  }
		});
	  };
	  
	  $("form.form_crud").on('click', '.js-create', function(){ 
			var url = $(this).attr("data-url");
			var formulario = ("#"+($(this).closest("form").attr("id")));

		    loadFormCreate(url, formulario, 'get'); 
	  });

	  $("form").on('click',".js-insert",function(){
	  		id = $(this).closest("form").attr("id");	  		
	  		var form = document.getElementById(id);
			var isValidForm = form.checkValidity(isValidForm); 	  	
			if(isValidForm === true){
				var url = $(this).attr("data-url");
				var formulario = "#"+id;
				loadFormCreate(url, formulario, 'post');
			}
	  });

	var loadFormUpdate = function (url, formulario, methodo) { 
		$.ajax({
		  url: url,
		  type: methodo,
		  dataType: 'json',
		  data: $(formulario).serialize(),
		  beforeSend: function () {			
			$(formulario+" button").attr("disabled","disabled");
		  },
		  complete: function(){$(formulario+" button").removeAttr("disabled");},
		  success: function (data) { //alert(JSON.stringify(data)); 
			$(formulario).html(data.html_form);
		  	if(data.form_is_valid === true){
		  		var alvo = $(formulario+" .table_crud"); 
		  		//$(formulario+" .alert").show().fadeOut( 4000 );	
		  		call_datatable(alvo);
		  	}
		  }
		});
	  };

	  $("form.form_crud").on('click', '.js-edit', function(){ 
			var url = ($(this).attr("url_edit")); 
			var formulario = ("#"+($(this).closest("form").attr("id")));			
		    loadFormUpdate(url, formulario, 'get');

	  });

	  $("form").on('click',".js-update",function(){
	  		id = $(this).closest("form").attr("id");	  		
	  		var form = document.getElementById(id);
			var isValidForm = form.checkValidity(isValidForm); 	  	
			if(isValidForm === true){
				var url = $(this).attr("data-url");
				var formulario = "#"+id;
				loadFormCreate(url, formulario, 'post');
			}
	  });	  	  