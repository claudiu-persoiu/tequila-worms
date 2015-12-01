
wormApp.controller('LoginController', ['$scope', 'socketService', function ($scope, socketService) {

    $scope.update = function (name) {
        if (name && name.length) {
            $scope.name = name;
            socketService.emit('start game', $scope.name);
            document.addEventListener('keydown', keyDirectionUpdate, false);
        }
    };

    var stopGame = function () {
        $scope.name = null;
        document.removeEventListener('keydown', keyDirectionUpdate);
    };

    socketService.on('disconnect', stopGame);
    socketService.on('you dead', stopGame);

    var directionMap = {
        '40': 'up',
        '38': 'down',
        '37': 'left',
        '39': 'right'
    };

    var keyDirectionUpdate = function (e) {
        var direction = directionMap[e.keyCode];
        if (direction) {
            socketService.emit('new direction', directionMap[e.keyCode]);
            e.preventDefault();
        }
    };

}]);