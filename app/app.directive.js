(function () {
    "use strict";

    angular
        .module("choosing-app")
        .directive("logger", logger)
        .directive("modalBodyTarget", modalBodyTarget)
        .directive("modalIdTarget", modalIdTarget);

    logger.$inject = [];

    function logger() {
        var directive = {
            link: link,
            restrict: "EA",
            scope: {
                oneWay: "<?", // one-way
                twoWay: "=?",
                string: "@?",
                onEvent: "&?", // on-event
            },
        };

        function link($scope, $element, $attrs, controller) {
            console.log("---------------------");
            console.log($element[0].nodeName);
            console.log("$scope");
            console.log($scope);
            console.log("$element");
            console.log($element);
            console.log("---------------------");
        }

        return directive;
    }

    function modalBodyTarget($rootScope) {
        const link = ($scope, $element, $attrs, controller) => {
            $rootScope.modalTargetElements = $rootScope.modalTargetElements || [];
            $rootScope.modalTargetElements = [...$rootScope.modalTargetElements, { key: $scope.key, element: $element.detach() }];
        };
        return {
            link: link,
            scope: {
                key: "@modalBodyTarget",
            },
            restrict: "A",
        };
    }

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
