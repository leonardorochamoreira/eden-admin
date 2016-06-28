var app = angular.module('app_eden', ['ionic', 'app_eden.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


    .state('app.novo_evento', {
      url: '/novo_evento',
      views: {
        'menuContent': {
          templateUrl: 'templates/novo_evento.html',
          controller: 'NovoEventoCtrl'
        }
      }
    })

    .state('app.novo_usuario', {
      url: '/novo_usuario/:evento_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/novo_usuario.html',
          controller: 'NovoUsuarioCtrl'
        }
      }
    })


    .state('app.eventos', {
      url: '/eventos',
      views: {
        'menuContent': {
          templateUrl: 'templates/eventos.html',
          controller: 'EventosCtrl'
        }
      }
    })

    .state('app.usuarios_eventos', {
      url: '/usuarios_eventos/:evento_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/usuarios_eventos.html',
          controller: 'UsuariosEventosCtrl'
        }
      }
    })


    .state('app.atualizar_evento', {
      url: '/atualizar_evento/:evento_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/atualizar_evento.html',
          controller: 'AtualizarEventoCtrl'
        }
      }
    })

  .state('app.detalhes_evento', {
    url: '/detalhes_evento/:evento_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/detalhes_evento.html',
        controller: 'DetalheEventoCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/eventos');
});


app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          var file = (element[0].files[0]);
          scope.file_selected = file.name;
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

app.service('EventoService', ['$http', function ($http,$scope) {
  this.add = function(Evento,url_upload,$state){
    var fd = new FormData();
    fd.append('file', Evento.img);
    fd.append('titulo', Evento.titulo);
    fd.append('sub_titulo', Evento.sub_titulo);
    fd.append('descricao', Evento.descricao);
    fd.append('data_evento', Evento.data_evento);

    $http.post(url_upload, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(){

        alert("Adicionado com sucesso!");
        $state.go("app.eventos",{reload: true});
        $scope.nao_exibir_loading = true;
        //window.location.assign("http://localhost/eden/www/#/app/eventos")
      })
      .error(function(){
      });
  };

  this.update = function(Evento,url_upload,$state){
    var fd = new FormData();
    fd.append('id', Evento.id);
    fd.append('file', Evento.img);
    fd.append('titulo', Evento.titulo);
    fd.append('sub_titulo', Evento.sub_titulo);
    fd.append('descricao', Evento.descricao);
    fd.append('data_evento', Evento.data_evento);

    $http.post(url_upload, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(){
        alert("Atualizado com sucesso!");
        $state.go("app.eventos",{reload: true});
        $scope.nao_exibir_loading = true;
        //window.location.assign("http://localhost/eden/www/#/app/eventos")
      })
      .error(function(){
      });
  }
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


app.service('UsuarioService', ['$http', function ($http) {

  this.add = function(Usuario,url_upload,$state,$scope,evento_id){

    //alert(evento_id); return false;
    var fd = new FormData();
    fd.append('eventos_id', evento_id);
    fd.append('file', Usuario.img);
    fd.append('nome', Usuario.nome);
    fd.append('email', Usuario.email);

    $http.post(url_upload, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(){

        alert("Adicionado com sucesso!");
        $state.go("app.usuarios_eventos",{evento_id:evento_id,reload: true});
        $scope.nao_exibir_loading = true;
        //window.location.assign("http://localhost/eden/www/#/app/usuarios_eventos")
      })
      .error(function(){
      });
  };

  this.update = function(Evento,url_upload,$state){
    var fd = new FormData();
    fd.append('id', Usuario.id);
    fd.append('file', Usuario.img);
    fd.append('nome', Usuario.nome);
    fd.append('email', Usuario.email);

    $http.post(url_upload, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .success(function(){
        alert("Atualizado com sucesso!");
        $state.go("app.usuarios_eventos",{reload: true});
        $scope.nao_exibir_loading = true;
        //window.location.assign("http://localhost/eden/www/#/app/usuarios_eventos")
      })
      .error(function(){
      });
  }
}]);
