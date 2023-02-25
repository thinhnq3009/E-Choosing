(function () {
    "use strict";

    angular.module("choosing-app").controller("testController", controller);

    controller.$inject = ["$scope", "$rootScope"];

    function controller($scope, $rootScope) {
        $rootScope.notifications = [{type: "message", content: "Thông báo lỗi từ Controller"}];
        $scope.handleAction = () =>  {
            console.log("Something");
            $rootScope.notifications = [ ...$rootScope.notifications ,{type: "message", content: "Xuất hiện thông báo"}]
        }
    }
})();
