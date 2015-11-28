
wormApp.controller('LoginController', ['$scope', 'socketService', function ($scope, socketService) {

    $scope.update = function (tmpname) {
        if (tmpname && tmpname.length) {
            $scope.name = tmpname;
            socket.emit('start game', $scope.name);
        }
    };

}]);