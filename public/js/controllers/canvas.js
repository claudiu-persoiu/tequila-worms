wormApp.controller('CanvasController', ['$scope', 'socketService', function ($scope, socketService) {


    socketService.on('matrix size', function (value) {
        $scope.matrixSize = value;
    });

}]);