(function () {
    "use strict";

    angular.module("choosing-app").factory("submissionQuiz", submissionQuiz);

    submissionQuiz.$inject = ["$rootScope", "$http", "$session"];

    function submissionQuiz($rootScope, $http, $session) {
        var factory = {};
        factory.submitQuiz = function (code) {
            const userId = $rootScope.userLogin
                ? $rootScope.userLogin.id
                : sessionStorage.getItem("userId") || -1;
            // Sử dụng Promise để đợi kết quả trả về từ API
            return new Promise((resolve, reject) => {
                $http
                    .post($rootScope.apiUrl + "/submission/", { params: { code, userId } })
                    .then(({ data }) => {
                        // Nếu thành công, trả về dữ liệu được trả về từ API
                        resolve(data);
                    })
                    .catch((error) => {
                        // Nếu có lỗi, trả về thông báo lỗi
                        reject(error);
                    });
            });
        };
        return factory;
    }
})();
