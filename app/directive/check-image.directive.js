(function () {
    "use strict";

    angular.module("choosing-app").directive("checkImage", defaultImage);

    defaultImage.$inject = ["$http", "$rootScope"];
    function defaultImage($http, $rootScope) {
        function link($scope, $element) {
            const linkImage = $element.attr("src");

            $http.get(linkImage).catch(() => {
                const newLink = $scope.linkImage || $rootScope.defaultImage;
                $element.attr("src", newLink);
                console.warn(`Change image "${linkImage}" to "${newLink}"`);
            });
        }

        return {
            link: link,
            restrict: "A",
            scope: {
                linkImage: "@checkImage",
            },
        };
    }
})();
