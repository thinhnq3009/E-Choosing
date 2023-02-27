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
        })
        .filter("formatTime", () => (input) => {
            if (isNaN(input) && input) return input;
            if (!input) return "0s";
            let output = "";
            var hours = Math.floor(input / 3600);
            output += hours === 0 ? "" : hours + "h ";

            input -= hours * 3600;
            var minutes = Math.floor(input / 60);
            output += minutes === 0 ? "" : minutes + "m ";

            var seconds = input - minutes * 60;
            output += seconds === 0 ? "0s" : seconds + "s";

            return output;
            // return (
            //     ("0" + hours).slice(-2) +
            //     ":" +
            //     ("0" + minutes).slice(-2) +
            //     ":" +
            //     ("0" + seconds).slice(-2)
            // );
        });
})();
