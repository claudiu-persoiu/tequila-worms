wormApp.controller('PlayersLoggingController', ['$scope', 'socketService', function ($scope, socketService) {

    $scope.messages = [];
    var max = 3;

    var addMessage = function (message) {
        $scope.messages.unshift(message);

        if ($scope.messages.length >= max) {
            $scope.messages = $scope.messages.slice(0, max);
        }
    };

    socketService.on('dead worm', function (message) {
        addMessage(message);
    });

}]);