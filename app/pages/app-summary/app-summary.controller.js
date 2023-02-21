(function(){
    'use strict';

    angular
        .module('choosing-app')
        .controller('summaryController', summaryController)

    /** @ngInject */
    function summaryController(){
       console.log("Đã nhận controller");

    }

}());