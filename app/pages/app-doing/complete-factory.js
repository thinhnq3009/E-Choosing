(function () {
    "use strict";

    /**
     * It takes a  object, a  object, and a data object, and returns a promise that
     * resolves to the result of a POST request to the URL stored in .apiUrl + "save_answer"
     * with the data object as the body of the request.
     * @param  - Angular's  service
     * @param  - This is the global scope of the application.
     * @param data - {
     * @returns A promise.
     */
    const saveAnswer = ($http, $rootScope, data) => {
        // return Promise.resolve(data).then((data) => console.log(data));
        return $http.post($rootScope.apiUrl + "/save_answer/", { params: { ...data } });
    };

    const pushAnswer = ($http, $rootScope, data) => {
        if (data.length === 0) {
            // Handel Complete when push all answers
            $rootScope.isLoading = false;
            return true;
        }

        Promise.resolve(data[0]).then((item) => {
            saveAnswer($http, $rootScope, item)
                .catch((error) => {
                    errorLog.push({ error, data });
                })
                .finally(pushAnswer($http, $rootScope, data.splice(1)));
        });
    };

    /**
     * It takes a submission_id and an array of questions, and returns an array of objects with the
     * submission_id, question_id, and answer_id for each question that has been answered.
     * @param submission_id - the id of the submission
     * @param questions - [{id: 1, answers: [{id: 1, selected: true}, {id: 2, selected: false}], done:
     * true}, {id: 2, answers: [{id: 3, selected: true}, {id: 4, selected: false}], done
     * @returns An array of objects.
     */
    const processQuestion = (submission_id, questions) => {
        let clearData = [];
        questions.forEach((question) => {
            if (!question.done) return;
            question.answers.forEach((answer) => {
                if (answer.selected) {
                    clearData.push({
                        submission_id,
                        question_id: question.id,
                        answer_id: answer.id,
                    });
                }
            });
        });
        return clearData;
    };

    angular.module("choosing-app").factory("completeQuiz", completeQuiz);

    completeQuiz.$inject = ["$rootScope", "$http"];
    /** @ngInject */
    function completeQuiz($rootScope, $http) {
        const factory = {};

        factory.completeQuiz = (quiz, questions) => {
            if (!quiz) {
                console.error("Can't complete quiz. Because quiz is not");
                return null;
            }

            if (!questions) {
                console.error("Can't complete quiz. Because no questions specified");
                return null;
            }

            const data = processQuestion(quiz.submission_id, questions);

            $rootScope.isLoading = true;
            return Promise.resolve(pushAnswer($http, $rootScope, data));
            // console.log(data);
        };

        return factory;
    }
})();
