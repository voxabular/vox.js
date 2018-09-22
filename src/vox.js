"use strict";

/**
 * @namespace
 */
var vox = {};

if (typeof(require) !== "undefined") {
    const THREE = require('three-js')([]);
}

(function() {
    if (typeof(window) !== "undefined") {
        vox.global = window;
        vox.global.vox = vox;
    } else {
        vox.global = global;
    }

    if (typeof(module) !== "undefined") {
        module.exports = vox;
    }

})();
