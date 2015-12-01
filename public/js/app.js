
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
            elementSize = {},
            headColor = '#000000';

        var drawMatrix = function (wormValue) {
            context.fillStyle = '#CCCCCC';
            context.clearRect(0, 0, canvasSize.width, canvasSize.height);

            wormValue.forEach(function (worm) {
                context.fillStyle = headColor;

                worm.pieces.forEach(function (piece) {

                    context.fillRect(
                        (piece.x + 1) * elementSize.width,
                        (piece.y + 1) * elementSize.height,
                        elementSize.width,
                        elementSize.height
                    );

                    context.fillStyle = worm.color;
                });
            });
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

        scope.$watch('wormData', function (value) {
            if (!value) {
                return;
            }

            drawMatrix(value);
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