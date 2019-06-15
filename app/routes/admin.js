module.exports = function(application) {

	application.get('/formulario_inclusao_noticia',function(req,res){
		res.render('admin/form_add_noticia', {validacao : {}, noticia : {}});

	});

	application.post('/noticias/salvar',function(req,res){
		var noticia = req.body;
		req.assert('titulo','O titulo eh obrigatorio').notEmpty();
		req.assert('resumo','O resumo eh obrigatorio').notEmpty();
		req.assert('resumo','O deve conter entre 10 e 100 caracteres').len(10,100);
		req.assert('autor','O Autor eh obrigatorio').notEmpty();
		req.assert('data_noticia','A data eh obrigatoria').notEmpty();
		req.assert('noticia','A noticia eh obrigatoria').notEmpty();

		var erros = req.validationErrors();
				
		//console.log(erros);		
		if(erros){
			res.render("admin/form_add_noticia", {validacao:{}, noticia:{} });
			return;

		}





		var connection = application.config.dbConnection();
		var noticiasModel = new application.app.models.NoticiasDAO(connection);
		noticiasModel.salvarNoticia(noticia, function(error, result){
			res.redirect('/noticias');
		});


	});

};

