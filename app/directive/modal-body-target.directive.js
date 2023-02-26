(function () {
    "use strict";

    angular.module("choosing-app").directive("modalBodyTarget", modalBodyTarget);

    function modalBodyTarget($rootScope) {
        const link = ($scope, $element, $attrs, controller) => {
            $rootScope.modalTargetElements = $rootScope.modalTargetElements || [];
            $rootScope.modalTargetElements = [
                ...$rootScope.modalTargetElements,
                { key: $scope.key, element: $element.detach() },
            ];
        };
        return {
            link: link,
            scope: {
                key: "@modalBodyTarget",
            },
            restrict: "A",
        };
    }
})();
