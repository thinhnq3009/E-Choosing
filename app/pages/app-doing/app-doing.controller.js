(function () {
    /**
     * Classification Quiz
     * @param data
     */
    const processData = (data) => {
        return data.filter((item, index) => {
            let counter = 0;
            item.isMultipleChoice = false;
            item.answers.map((answer) => {
                if (answer.is_correct == 1) {
                    counter++;
                    if (counter === 2) item.isMultipleChoice = true;
                }
            });
            return index < 20;
        });
    };

    /**
     *  Initialize handel function
     * @param  - the scope of the controller
     * @returns A function that returns an object.
     */
    const getHandler = ($scope) => {
        const update = () => {
            sessionStorage.setItem("doing", JSON.stringify($scope.questions));
            $scope.complete = $scope.questions.reduce(
                (value, item) => (item.done ? ++value : value),
                0
            );
        };

        return {
            next: () => {
                if (++$scope.doing == $scope.questions.length) {
                    $scope.doing = 0;
                }

                update();
            },

            prev: () => {
                if (--$scope.doing == -1) {
                    $scope.doing = $scope.questions.length - 1;
                }

                update();
            },

            goto: ($index) => {
                $scope.doing = $index;

                update();
            },

            note: () => {
                let question = $scope.questions[$scope.doing];
                question.note = !question.note;
                console.log(question);

                update();
            },

            select: ($index, id) => {
                const isMultipleChoice = $scope.questions[$index].isMultipleChoice;
                let answers = $scope.questions[$index].answers;

                answers.map((item) => item.id == id && (item.selected = !item.selected));

                if (!isMultipleChoice) {
                    answers.map((item) => item.id != id && (item.selected = false));
                }

                if (answers.some((item) => item.selected)) $scope.questions[$index].done = true;
                else $scope.questions[$index].done = false;
                console.log($scope.questions[$index]);

                update();
            },
        };
    };

    /**
     * Calculate the score based on the array of questions
     * @param questions - [{
     * @returns { userMarks, maxMarks }
     */
    

    function handelComplete($scope, $location, $anchorScroll, completeQuiz) {
        return () => {
            console.log($scope.completeQuiz);
            const { quiz, questions } = $scope;
            completeQuiz.completeQuiz(quiz, questions).then(() => {
                $location.url("/summary")
                $anchorScroll("header")
            });
        };
    }

    const initCountDown = ($interval, $scope, $http, $rootScope) => {
        return () => {
            const params = {
                submission_id: $scope.quiz.submission_id,
            };

            $http.put($rootScope.apiUrl + "/submission/", { params }).then(({ data }) => {
                let idTimeOut = $interval(() => {
                    if (!--$scope.counter) {
                        $interval.cancel(idTimeOut);
                    } else {
                        var minutes = Math.floor($scope.counter / 60);
                        var seconds = $scope.counter - minutes * 60;
                        $scope.remaining =
                            ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
                    }
                }, 1000);
                $scope.doing = 0;
            });

            let idTimeOut = $interval(() => {
                var minutes = Math.floor($scope.counter / 60);
                var seconds = $scope.counter - minutes * 60;
                $scope.remaining = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

                if (!$scope.counter) {
                    $interval.cancel(idTimeOut);
                }
            }, 1000);

            $scope.doing = 0;
        };
    };

    angular.module("choosing-app").controller("doingController", [
        "$scope",
        "$rootScope",
        "$routeParams",
        "$http",
        "$interval",
        "$location",
        "$anchorScroll",
        "submissionQuiz",
        "completeQuiz",
        (
            $scope,
            $rootScope,
            $routeParams,
            $http,
            $interval,
            $location,
            $anchorScroll,
            submissionQuiz,
            completeQuiz
        ) => {
            $rootScope.isLoading = true;
            $scope.code = $routeParams.code.toUpperCase();
            $scope.complete = 0;
            let code = $scope.code;

            // Buttons will render in the Modal window  when submitting
            $scope.modalButtons = [
                {
                    className: "btn-success",
                    event: handelComplete($scope, $location, $anchorScroll, completeQuiz),
                    text: "Submit",
                },
            ];

            submissionQuiz
                .submitQuiz(code)
                .then((data) => {
                    if (data.error) {
                        $location.url("/404error");
                    }

                    $scope.quiz = data;
                    $scope.counter = data.duration;
                    // Get question by QuizID
                    $http
                        .get($rootScope.apiUrl + "/questions/", { params: { id: data.id } })
                        .then(({ data }) => {
                            data = processData(data);
                            $scope.questions = data;
                            console.log($scope);
                        })
                        .catch((error) => {
                            // Handel the error
                        })
                        .finally(() => {
                            $rootScope.isLoading = false;
                        });

                    $scope.handelStart = initCountDown($interval, $scope, $http, $rootScope);
                    $scope.handler = getHandler($scope);
                    $scope.handelSubmit = handelSubmit($scope);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => ($rootScope.isLoading = false));

            // // Get quiz by CODE
            // $http
            //     .get($rootScope.apiUrl + "/quiz/", { params: { code } })
            //     .then(({ data }) => {
            //         if (data.error) {
            //             $location.url("/404error");
            //         }

            //         $scope.quiz = data;
            //         $scope.counter = data.duration;
            //         // Get question by QuizID

            //         $http
            //             .get($rootScope.apiUrl + "/questions/", { params: { id: data.id } })
            //             .then(({ data }) => {
            //                 processData(data);
            //                 $scope.questions = data;
            //             })
            //             .catch((error) => {
            //                 // Handel the error
            //             })
            //             .finally(() => {
            //                 $rootScope.isLoading = false;
            //             });

            //         $scope.handelStart = initCountDown($interval, $scope);
            //     })
            //     .catch((error) => console.log(error))
            //     .finally(() => {
            //         $scope.handler = getHandler($scope);
            //     });
        },
    ]);
})();
