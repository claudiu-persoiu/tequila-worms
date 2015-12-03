wormApp.controller('LoginModalController', ['$scope', '$uibModalInstance', 'user', function ($scope, $uibModalInstance, user) {

    $scope.name = user.name;

    $scope.ok = function () {
        $uibModalInstance.close($scope.name);
    };

}]);