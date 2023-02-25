(function () {
    "use strict";

    const calculateMarks = (questions, $session) => {
        console.log(questions);

        let timer = $session.get("time_complete");

        // time is a milliseconds
        const time = (new Date(timer.end_time) - new Date(timer.start_time)) / 1000;
        const { duration } = timer;

        console.log(duration, time);

        // timeCoefficient = remaining time / duration
        const timeCoefficient = (duration - time) / duration + 1;

        let maxCount = 0;
        let maxScore = 0;
        let userScore = 0;
        let userCorrect = 0;
        let userCount = 0;
        let unselected = 0;
        questions.forEach((question) => {
            question.done || (unselected += 1);
            question.is_correct = undefined;

            let haveAnswerIncorrect = false;

            question.answers.forEach((answer) => {
                if (answer.selected) {
                    userCount++;

                    if (answer.is_correct === "1") {
                        userCorrect++;
                        userScore += Number(question.marks);
                        console.log("Ban da dung cau nay");
                        question.is_correct = true;
                    } else if (answer.is_correct === "0") {
                        haveAnswerIncorrect = true;
                    }
                }

                if (answer.is_correct === "1") {
                    maxCount += 1;
                    maxScore += Number(question.marks);
                    answer.is_correct = true;
                } else {
                    answer.is_correct = false;
                }
            });

            if (haveAnswerIncorrect) question.is_correct = false;
        });

        return {
            correct: userCorrect,
            unselected,
            incorrect: userCount - userCorrect,
            score: userScore * timeCoefficient,
            percent: Math.round((userCorrect / maxCount) * 100) + "%",
            timePerQuestion: duration / (userCount * 1000),
        };
    };

    angular.module("choosing-app").controller("summaryController", summaryController);

    summaryController.$inject = ["$scope", "$rootScope", "$session"];

    /** @ngInject */
    function summaryController($scope, $rootScope, $session) {
        const data = $session.get("data_complete");
        const { quiz, questions } = data;

        if (!quiz || !questions) {
            console.error("Can't complete quiz. Because quiz or questions is not specified");
            return null;
        }

        $scope.info = calculateMarks(questions, $session);
        $scope.quiz = quiz;
        $scope.questions = questions;

        console.log($scope.questions);
    }
})();
