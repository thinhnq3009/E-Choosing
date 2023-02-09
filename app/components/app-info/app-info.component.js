angular
    .module("choosing-app")
    .component("appInfo", {
        templateUrl: "components/app-info/app-info.template.html",
        controller: ["$scope", "$rootScope", ($scope, $rootScope) => {
            
            console.log($scope)




        }],
    });
