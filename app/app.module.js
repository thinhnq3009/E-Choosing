const RootController = ($rootScope, $http) => {};

const getUser = ($rootScope, $http) => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    $http.post($rootScope.apiUrl + "/validate/", { params: { token } }).then(({data}) => {
        if (!data) return;
        if (data.error) {
            console.log("Không duy trì đăng nhập được")
        } else  {
            sessionStorage.setItem("token", data.token);
            $rootScope.userLogin = data;
        }
    }).catch().finally();
};

angular
    .module("choosing-app", ["ngRoute"])
    .run([
        "$rootScope",
        "$http",
        ($rootScope, $http) => {
            $rootScope.apiUrl = "http://api-e-choosing.quocthinhtme.tk";
            $rootScope.apiUrl = "http://localhost/api-e-choosing";
            getUser($rootScope, $http);
        },
    ])
    .controller("rootController", ["$rootScope", "$http", RootController])
    .filter('titleCase', function() {
        return function(input) {
          input = input || '';
          var words = input.split(' ');
          for (var i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }
          return words.join(' ');
        };
      });
