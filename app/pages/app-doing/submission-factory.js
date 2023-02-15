(function () {
    "use strict";

    angular.module("choosing-app").factory("submissionQuiz", submissionQuiz);

    submissionQuiz.$inject = ["$rootScope", "$http"];

    function submissionQuiz($rootScope, $http) {
        var factory = {};
        factory.submitQuiz = function (code) {
            console.log(code);
        };
        return factory;
    }
})();
