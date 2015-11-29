
var wormApp = angular.module('worms', ['ng', 'btford.socket-io']);

wormApp.directive('loginUser', function () {
    return {
        controller: 'LoginController',
        templateUrl: 'templates/login.html'
    };
}).directive('canvasContainer', function () {

    var link = function (scope, element, attrs) {

        var canvas = element.find('canvas')[0],
            context = canvas.getContext('2d'),
            canvasSize = {
                width: canvas.width,
                height: canvas.height
            },
            matrixSize = {},
            elementSize = {};

        var drawMatrix = function (matrix) {
            context.fillStyle = '#CCCCCC';
            context.clearRect(0, 0, canvasWidth, canvasHeight);
        };

        var getElementSize = function (matrixSize) {
            elementSize.width = canvasSize.width / matrixSize.x;
            elementSize.height = canvasSize.height / matrixSize.y;
        };

        scope.$watch('matrixSize', function(value) {
            if (!value) {
                return;
            }

            matrixSize = value;
            getElementSize(value);
        });
    };

    return {
        controller: 'CanvasController',
        templateUrl: 'templates/canvas.html',
        link: link
    };
}).directive('playersList', function () {
    return {
        controller: 'PlayersListController',
        templateUrl: 'templates/players-list.html'
    };
}).directive('playersLogging', function () {
    return {
        controller: 'PlayersLoggingController',
        templateUrl: 'templates/players-logging.html'
    };
});