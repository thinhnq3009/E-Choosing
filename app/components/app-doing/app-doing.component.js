(function () {
    const processData = (data) => {
        data.map((item) => {
            let counter = 0;
            item.isMultipleChoice = false;
            item.answers.map((answer) => {
                answer.is_correct == 1 && counter++;
                if (counter === 2) {
                    item.isMultipleChoice = true;
                }
            });
        });
    };

    angular.module("choosing-app").component("appDoing", {
        templateUrl: "components/app-doing/app-doing.template.html",
        controller: [
            "$scope",
            "$rootScope",
            "$routeParams",
            "$http",
            "$location",
            "$interval",
            ($scope, $rootScope, $routeParams, $http, $location, $interval) => {
                $rootScope.isLoading = true;
                $scope.code = $routeParams.code.toUpperCase();
                let code = $scope.code;

                $http
                    .get($rootScope.apiUrl + "/quiz/", { params: { code } })
                    .then(({ data }) => {
                        $scope.quiz = data;
                        $scope.counter = data.duration;

                        console.log("Get Question" + data.id);
                        $http
                            .get($rootScope.apiUrl + "/questions/", { params: { id: data.id } })
                            .then(({ data }) => {
                                processData(data);

                                console.log(data);
                                $scope.questions = data;
                            })
                            .catch((error) => {
                                // Handel the error
                            })
                            .finally(() => {
                                $rootScope.isLoading = false;
                            });

                        $scope.handelStart = () => {
                            let idTimeOut = $interval(() => {
                                if (!--$scope.counter) {
                                    $interval.cancel(idTimeOut);
                                } else {
                                    var minutes = Math.floor($scope.counter / 60);
                                    var seconds = $scope.counter - minutes * 60;
                                    $scope.remaining = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
                                }
                            }, 1000);

                            $scope.doing = 0;
                        };
                    })
                    .catch((error) => console.log(error));
            },
        ],
    });
})();
