(function () {
    'use strict';

    angular
        .module ('choosing-app')
        .component ('appBanner', appBanner());


    function appBanner() {
        function appBannerController(){
           
        }

        return {
            controller: appBannerController,
            templateUrl: "components/app-banner/app-banner.template.html"
        }
    }

} ());