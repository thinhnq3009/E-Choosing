(function () {
    "use strict";

    angular.module("choosing-app").factory("$notifier", $notifier);

    /** @ngInject */
    function $notifier($rootScope) {
        return {
            show: show,
            showError: showError,
            showSuccess: showSuccess,
            showWarning: showWarning,
            showMessage: showMessage,
        };

        function show(object) {
            if (!object.message) throw new Error("Your message is undefined");
            if (!object.type) throw new Error("Your type is undefined");
            try {
                $rootScope.notifications.push(object);
            } catch (e) {
                $rootScope.notifications = [object];
            }
        }

        function showError(message) {
            show({ type: "danger", message });
        }
        function showSuccess(message) {
            show({ type: "success", message });
        }
        function showWarning(message) {
            show({ type: "warning", message });
        }
        function showMessage(message) {
            show({ type: "message", message });
        }
    }
})();
