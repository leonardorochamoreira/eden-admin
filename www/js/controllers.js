angular.module('app_eden.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  ///////////spinner
  ///////////$scope.nao_exibir_loading = true;

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



  .controller('NovoEventoCtrl', function($scope,$http,$state,EventoService) {

    $scope.data_hoje = function(){
      var data = new Date();
      var dia = data.getDate();
      var mes = data.getMonth() + 1;
      var ano = data.getFullYear();
      return [dia, mes, ano].join('/');

    };

    $scope.nao_exibir_loading = true;

    $scope.adicionar_evento = function(Evento){

      $scope.nao_exibir_loading = false;

      // console.log('Evento contro');
      // console.log(Evento);


      var url_upload = "http://api-eden.cursophprj.com.br/eventos/insert";
      //var url_upload = "http://localhost/eden/api/eventos/insert";
      EventoService.add(Evento,url_upload,$state);


    };
  })


  .controller('NovoUsuarioCtrl', function($scope,$http,$state,$stateParams,UsuarioService) {

    $scope.evento_id  = $stateParams.evento_id;
    
    $scope.nao_exibir_loading = true;

    $scope.adicionar_usuario = function(Usuario,evento_id){

    $scope.nao_exibir_loading = false;

      var url_upload = "http://api-eden.cursophprj.com.br/usuario_evento/insert";
      //var url_upload = "http://localhost/eden/api/eventos/insert";

      UsuarioService.add(Usuario,url_upload,$state,$scope,evento_id);

      //var url_upload = "http://api-eden.cursophprj.com.br/eventos/list";
      //var url_upload = "http://localhost/eden/api/eventos/insert";
      //UsuarioService.add(Usuario,url_upload,$state,$scope);

      };
  })


  .controller('EventosCtrl', function($scope,$http) {

    $http.get("http://api-eden.cursophprj.com.br/eventos") .then(function(response) {
      $scope.eventos = (response.data.eventos);

    });

    $scope.excluir_evento = function (id) {
      $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id});
      alert("Excluido com sucesso!");
    };

    $scope.listarTodosEventos = function () {
      $http.get("http://api-eden.cursophprj.com.br/eventos") .then(function(response) {
        $scope.eventos = (response.data.eventos);
      });
    };

    $scope.excluir_evento = function (id) {
      $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id})
        .success(function (){
            $scope.listarTodosEventos();
          }
        );
    }
  })


  .controller('UsuariosEventosCtrl', function($scope,$http,$stateParams) {

    $scope.evento_id = $stateParams.evento_id;

    $scope.nao_exibir_loading=false;

    $http.get("http://api-eden.cursophprj.com.br/usuario/list/"+$scope.evento_id) .then(function(response) {

      $scope.quantidade_usuarios = (response.data.rowCount);

      $scope.lista_usuarios = (response.data.data_usuarios);
    });

    $http.get("http://api-eden.cursophprj.com.br/usuario/list") .then(function(response) {
      $scope.eventos = (response.data.data_usuarios);

    });

    $scope.excluir_evento = function (id) {
      $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id});
      alert("Excluido com sucesso!");
    };


    $scope.listarTodosUsuarios = function () {
      $http.get(" http://api-eden.cursophprj.com.br/usuario/list") .then(function(response) {
        $scope.lista_usuarios = (response.data.data_usuarios);
      });
    };

    $scope.excluir_evento = function (id) {
      $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id})
        .success(function (){
            $scope.listarTodosUsuarios();
          }
        );
    }

  })


  .controller('AtualizarEventoCtrl', function($scope,$stateParams,$http,EventoService,$state) {

    $scope.nao_exibir_loading = true;

    var evento_id = $stateParams.evento_id;

    $scope.evento_id = evento_id;

    $http.get("http://api-eden.cursophprj.com.br/eventos/"+evento_id) .then(function(response) {
            $scope.Evento = (response.data.eventos);

    });


    $scope.excluir_evento = function (id) {
      $http.post('http://api-eden.cursophprj.com.br/eventos/delete', {'id':id})
        .success(function (){
            $scope.listarTodosEventos();
          }
        )};

      $scope.atualizar_evento = function (Evento) {
        $scope.nao_exibir_loading = false;
      var url_upload = "http://api-eden.cursophprj.com.br/eventos/update";
      //var url_upload = "http://localhost/eden/api/eventos/update";
      EventoService.update(Evento,url_upload,$state);
      //$http.post('http://api-eden.cursophprj.com.br/eventos/update', {'id':Evento.id,'titulo':Evento.titulo,sub_titulo:Evento.sub_titulo,'descricao':Evento.descricao,'data_evento':Evento.data_evento});
      //alert("Atualizado com sucesso!");
    }
  })


.controller('DetalheEventoCtrl', function($scope,$stateParams,$http) {

  $scope.evento_id = $stateParams.evento_id;

  $http.get("http://api-eden.cursophprj.com.br/usuario/list/"+$scope.evento_id) .then(function(response) {

    $scope.quantidade_usuarios = (response.data.rowCount);
  });

  var evento_id = $stateParams.evento_id;
  $scope.evento_id = evento_id;

  $http.get("http://api-eden.cursophprj.com.br/eventos/"+evento_id) .then(function(response) {
    $scope.evento_selecionado = (response.data.eventos);

  })

});
