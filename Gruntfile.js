var package = require("./package.json");

var BANNER = [
  "/*",
  " * vox.js " + package.version,
  " * https://github.com/daishihmr/vox.js",
  " * ",
  " * The MIT License (MIT)",
  " * Copyright © 2015, 2016 daishi_hmr, dev7.jp",
  " * ",
  " * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and",
  " * associated documentation files (the “Software”), to deal in the Software without restriction, including",
  " * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies",
  " * of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following",
  " * conditions:",
  " * ",
  " * The above copyright notice and this permission notice shall be included in all copies or substantial portions",
  " * of the Software.",
  " * ",
  " * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR",
  " * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,",
  " * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE",
  " * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER",
  " * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,",
  " * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN",
  " * THE SOFTWARE.",
  " */",
  "",
].join("\n");

module.exports = function(grunt) {
  var SRC = [
    "src/vox.js",
    "src/voxeldata.js",
    "src/xhr.js",
    "src/parser.js",
    "src/meshbuilder.js",
    "src/texturefactory.js",
    "src/defaultpalette.js",

    "src/md5.js",
  ];

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.initConfig({
    concat: {
      vox: {
        src: SRC,
        dest: "build/vox.js",
        options: {
          banner: BANNER
        }
      }
    },
    watch: {
      vox: {
        files: SRC,
        tasks: ["concat"],
      }
    },
    uglify: {
      vox: {
        src: "build/vox.js",
        dest: "build/vox.min.js",
        options: {
          banner: BANNER
        }
      }
    }
  });

  grunt.registerTask("default", ["concat", "uglify"]);
};
