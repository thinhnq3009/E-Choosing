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

    const calculateMarks = (questions, $session) => {
        console.log(questions);

        let timer = $session.get("time_complete");

        // time is a milliseconds
        const total_time = (new Date(timer.end_time) - new Date(timer.start_time)) / 1000;
        const { duration } = timer;

        // timeCoefficient = remaining time / duration + 1f
        const timeCoefficient = (duration - total_time) / duration + 1;

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

            if (haveAnswerIncorrect) {
                question.is_correct = false;
            }
        });

        return {
            correct: userCorrect,
            unselected,
            total_time,
            incorrect: userCount - userCorrect,
            score: userScore * timeCoefficient,
            percent: Math.round((userCorrect / maxCount) * 100) + "%",
            scorePerTen: Math.round((userCorrect / maxCount) * 100),
            timePerQuestion: duration / (userCount * 1000),
        };
    };

    /**
     * It takes a submission_id and an array of questions, and returns an array of objects with the
     * submission_id, question_id, and answer_id for each question that has been answered.
     * @param submission_id - the id of the submission
     * @param questions - [{id: 1, answers: [{id: 1, selected: true}, {id: 2, selected: false}], done:
     * true}, {id: 2, answers: [{id: 3, selected: true}, {id: 4, selected: false}], done
     * @returns An array of objects {submission_id, question_id, answer_id}
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

    completeQuiz.$inject = ["$rootScope", "$http", "$session"];
    /** @ngInject */
    function completeQuiz($rootScope, $http, $session) {
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

            // mảng chứa danh sách câu hỏi và câu trả lời
            const data = processQuestion(quiz.submission_id, questions);

            $rootScope.isLoading = true;

            return $http
                .put($rootScope.apiUrl + "/end_quiz/", {
                    params: { submission_id: quiz.submission_id },
                })
                .then((response) => {
                    const { start_time, end_time } = response.data;
                    const duration = quiz.duration;
                    $session.set("time_complete", { start_time, end_time, duration });

                    const info = calculateMarks(questions, $session);
                    $session.set("data_complete", { quiz, questions, info });

                    Promise.resolve(pushAnswer($http, $rootScope, data)).then(() => {
                        $http
                            .put($rootScope.apiUrl + "/submission/", {
                                params: {
                                    score: info.scorePerTen,
                                    submission_id: quiz.submission_id,
                                },
                            })
                            .then(({ data }) => {
                                console.log(data);
                            });
                    });
                });
        };

        return factory;
    }
})();
