angular.module("choosing-app").component("appLogin", {
    templateUrl: "components/app-login/app-login.template.html",
    controller: [
        "$scope",
        "$http",
        "$rootScope",
        "$location",
        ($scope, $http, $rootScope, $location) => {
            $scope.handelShowPass = () => {
                $scope.show = !$scope.show;
            };

            $scope.handelSubmit = () => {
                $rootScope.isLoading = true;
                $scope.errorMessage = "";
                console.log($scope.errorMessage);
                const data = {
                    username: $scope.username,
                    password: $scope.password,
                };

                $http
                    .get($rootScope.apiUrl + "/user", { params: data })
                    .then(({ data }) => {
                        if (data.length > 0) {
                            sessionStorage.setItem("token", data[0].token);
                            $rootScope.userLogin = data[0];
                            $rootScope.userLogin

                            console.log($rootScope.userLogin);

                            $location.url("/user-info")
                        } else {
                            $scope.errorMessage = "Login failed! Please try again";
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        $rootScope.isLoading = false;
                    });
            };
        },
    ],
});
