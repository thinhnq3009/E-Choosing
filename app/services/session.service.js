(function () {
    "use strict";

    angular.module("choosing-app").factory("$session", $session);

    /** @ngInject */
    function $session() {
        return  {
            set: set,
            get: get,
            delete: del,
        };

        function del(key) {
            sessionStorage.removeItem(key);
        }

        function get(key) {
            const data = sessionStorage.getItem(key);
            return JSON.parse(data) || data;
        }

        function set(key, data) {
            if (typeof data === "object") {
                sessionStorage.setItem(key, JSON.stringify(data));
            } else {
                sessionStorage.getItem(key, data);
            }
        }
    }
})();
