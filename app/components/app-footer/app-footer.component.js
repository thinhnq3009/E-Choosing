angular
    .module('choosing-app')
    .component('appFooter', {
        templateUrl: "components/app-footer/app-footer.template.html",
        controller: ($scope) => {
            $scope.a = "a";
        }
    });


