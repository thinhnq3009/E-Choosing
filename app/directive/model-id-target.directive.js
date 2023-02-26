(function () {
    "use strict";

    angular.module("choosing-app").directive("modalIdTarget", modalIdTarget);
    function modalIdTarget($rootScope) {
        const link = ($scope, $element, $attrs, controller) => {
            $element[0].setAttribute("data-toggle", "modal");
            $element[0].setAttribute("data-target", "#" + $scope.key);
        };

        return {
            link: link,
            scope: {
                key: "@modalIdTarget",
            },
            restrict: "A",
        };
    }
})();
