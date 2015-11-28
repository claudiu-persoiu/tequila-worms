
var wormApp = angular.module('worms', ['ng', 'btford.socket-io']);

wormApp.directive('loginUser', function () {
    return {
        controller: 'LoginController',
        templateUrl: 'templates/login.html'
    };
}).directive('canvasContainer', function () {
    return {
        controller: 'CanvasController',
        templateUrl: 'templates/canvas.html'
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