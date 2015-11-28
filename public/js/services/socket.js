
wormApp.factory('socketService', ['socketFactory', function (socketFactory) {
    return socketFactory();
}]);