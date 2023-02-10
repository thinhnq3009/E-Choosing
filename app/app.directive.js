(function () {
    "use strict";

    angular.module("choosing-app").directive("logger", logger);

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
            console.log("$scope");
            console.log($scope);
            console.log("$element");
            console.log($element);
        }

        return directive;
    }
})();

