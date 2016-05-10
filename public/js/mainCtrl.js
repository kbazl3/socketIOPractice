angular.module("app")
    .controller("mainCtrl", function($scope) {

        var socket = io();

        var myEl = angular.element(document.querySelector('#messages'));

        $scope.sendMessage = function(msg) {
            console.log(msg);
            socket.emit('chat message', msg);
            $scope.messageBox = "";
            return false;
        };

        socket.on('chat message', function(msg) {
            myEl.append('<li>' + msg + '</li>');
        });



        // $('form').submit(function(){
        //   socket.emit('chat message', $('#m').val());
        //   $('#m').val('');
        //   return false;
        // });
        // socket.on('chat message', function(msg){
        //   $('#messages').append($('<li>').text(msg));
        // });

});
