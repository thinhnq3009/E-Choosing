(function () {
    "use strict";

    angular.module("choosing-app").service("$users", $users);

    $users.$inject = ["$rootScope", "$http", "$notifier", "$session"];
    function $users($rootScope, $http, $notifier, $session) {
        function update({
            fullname,
            email,
            phone,
            className,
            gender,
            dob,
            school,
            password,
            avatar,
        }) {
            const data = {
                fullname,
                email,
                phone,
                className,
                gender,
                dob,
                school,
                password,
                avatar,
                token: $rootScope.userLogin.token,
            };

            console.log(data);

            $http.put($rootScope.apiUrl + "/user/", { params: { ...data } }).then(({ data }) => {
                $notifier.readAndShow(data);
            });
        }

        function validate() {
            const token = $session.get("token", false);

            if (!token) return;
            $http.post($rootScope.apiUrl + "/validate/", { params: { token } }).then(({ data }) => {
                if (!data) return;
                if (data.error) {
                    $session.delete("token");
                    console.log("Can't maintain login");
                    $notifier.showError("Can't maintain login. Please login again.");
                } else {
                    $rootScope.userLogin = data;
                    $session.set("token", data.token);
                    $session.set("userId", data.id);
                }
            });
        }

        return {
            update: update,
            validate: validate,
        };
    }
})();
