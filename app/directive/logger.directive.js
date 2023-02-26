(function () {
    "use strict";

    angular.module("choosing-app").directive("logger", logger);

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
            console.log($scope);
            console.log($element);
            console.log("---------------------");
        }

        return directive;
    }
})();
