(function () {
    "use strict";

    const TIME_SHOW = 7000;


    angular.module("choosing-app").component("appNotification", {
        templateUrl: "components/app-notification/app-notification.template.html",
        controller: ["$scope", "$rootScope", "$element", appNotificationController],
        bindings: {
            content: "@",
            type: "@",
            data: "=",
        },
    });

    function appNotificationController($scope, $rootScope, $element) {
        let bindingData = undefined;

        this.$onInit = () => {
            bindingData = this.data;
            console.log(bindingData);
        };

        // Tự  động tắt 
        setTimeout(() => {
            $scope.handelClose();
        }, TIME_SHOW);

        $scope.handelClose = function (closeIcon) {
            $element.find(".notification-item").addClass("closed");
            setTimeout(() => {
                $element.remove();
                $rootScope.notifications = $rootScope.notifications.filter(
                    (item) => item.$$hashKey !== bindingData.$$hashKey
                );
            }, 1000);
        };
    }
})();
