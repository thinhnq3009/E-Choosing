(function () {
    angular
        .module("choosing-app")
        .filter("titleCase", function () {
            return function (input) {
                input = input || "";
                var words = input.split(" ");
                for (var i = 0; i < words.length; i++) {
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                }
                return words.join(" ");
            };
        })
        .filter("toTime", () => (input) => {
            if (isNaN(input) && input) return input;
            var minutes = Math.floor(input / 60);
            var seconds = input - minutes * 60;
            return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
        });
})();
