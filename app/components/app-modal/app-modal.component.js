/**
 * @component <app-modal></app-model>
 *
 *@props
 *@title {String} modal title
 *@body {String} modal body
 *@target {Element} modal body. (If both body and target will prioritize body display)
 *@button {Expression} is object containing {class, evt, text}
 *
 */

(function () {
    "use strict";

    angular.module("choosing-app").component("appModal", {
        templateUrl: "components/app-modal/app-modal.template.html",
        bindings: {
            title: "@",
            body: "@",
            target: "@",
            buttons: "=",
            idModal: "@",
        },
        controller: [
            "$scope",
            "$rootScope",
            "$element",
            ($scope, $rootScope, $element) => {
                console.log($scope);

                $scope.render = () => {
                    if (!$rootScope.modalTargetElements) {
                        console.error(
                            "Don't have modal target elements. Please add directive 'modal-body-target' or add attribute 'body' to <app-modal></app-modal>"
                        );
                        return "Don't have modal target elements. ";
                    }
                    // Selects element to be rendered
                    const e = $rootScope.modalTargetElements.find((item) => item.key == $scope.$ctrl.target);
                    // Append element to be rendered
                    $element[0].querySelector("#body").append(e.element[0]);
                    return "";
                };
            },
        ],
    });
})();
