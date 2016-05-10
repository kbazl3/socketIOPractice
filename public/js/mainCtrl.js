angular.module("app")
    .controller("mainCtrl", function($scope, $http) {

        var socket = io();

        var myEl = angular.element(document.querySelector('#messages'));
        $scope.username = true;

        $scope.sendMessage = function(msg) {
            console.log(msg);
            socket.emit('chat message', msg);
            $scope.messageBox = "";
            return false;
        };

        socket.on('chat message', function(msg) {
            myEl.append('<li>' + msg + '</li>');
        });

        $scope.getUsername = function() {
            $http({
                method: "GET",
                url: '/'
            })
            .then(function(fbuser) {
                console.log(fbuser);
            });
        };



        // $('form').submit(function(){
        //   socket.emit('chat message', $('#m').val());
        //   $('#m').val('');
        //   return false;
        // });
        // socket.on('chat message', function(msg){
        //   $('#messages').append($('<li>').text(msg));
        // });

});
