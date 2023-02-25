module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                mangle: false,
            },
            build: {
                files: {
                    "build/app.min.js": ["app/**/*.js"],
                },
            },
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ["app/**/*", "!app/**/*.js"],
                        dest: "build/",
                    },
                ],
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["uglify", "copy"]);
};
