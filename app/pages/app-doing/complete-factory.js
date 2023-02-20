(function () {
    "use strict";

    const saveAnswer = ($http, $rootScope, data) => {



        return $http.post($rootScope.apiUrl + "save_answer", {param : {...data}})

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
                    clearData = [
                        ...clearData,
                        {
                            submission_id,
                            question_id: question.id,
                            answer_id: answer.id,
                        },
                    ];
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
            console.log(data);
        };

        return factory;
    }
})();
