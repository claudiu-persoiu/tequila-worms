
wormApp.controller('LoginController', ['$scope', 'socketService', function ($scope, socketService) {

    $scope.update = function (name) {
        if (name && name.length) {
            $scope.name = name;
            socketService.emit('start game', $scope.name);
        }
    };

    socketService.on('disconnect', function () {
        $scope.name = null;
    });

}]);