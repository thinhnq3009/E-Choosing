(function () {
    "use strict";

    angular.module("choosing-app").controller("quizzesController", quizzesController);

    quizzesController.$inject = ["$scope", "$rootScope", "$http"];

    function quizzesController($scope, $rootScope, $http) {
        $rootScope.isLoading = true;
        $http
            .get($rootScope.apiUrl + "/quiz/?all")
            .then(({ data }) => {
                $scope.quizzes = data.map((item) => {
                    console.log(item);
                    if (item.max_question > Number(item.num_of_question)) {
                        item.max_question = item.num_of_question;
                    }
                    return item;
                });

                console.log($scope.quizzes);
            })
            .finally(() => {
                $rootScope.isLoading = false;
            });
    }
})();
