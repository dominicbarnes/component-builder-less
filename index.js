// dependencies
var extend = require("extend");
var less = require("less");
var debug = require("debug")("component-builder-less");

/**
 * Creates a function for transforming a single LESS file into CSS
 *
 * The `options` object passed to the LESS parser, see the
 * [LESS docs](http://lesscss.org/usage/) for more information.
 *
 * @param {Object} options
 */
module.exports = function (options) {
    if (!options)       options = {};
    if (!options.paths) options.paths = [];

    debug("creating builder plugin function", options);

    return function (file, done) {
        // only run this transformation for .less files
        if (file.extension !== "less") return done();

        debug("processing", file.filename);

        // setting up default config options
        var defaults = {
            // TODO: make this relative (shorter and easier to comprehend)
            filename: file.filename
        };

        // create a new options object for this specific file
        // notice, this particular extend works like jQuery's extend,
        // so we're deep-extending this object.
        var opts = extend(true, {}, defaults, options);

        debug("options", opts);

        file.read(function (err, str) {
            if (err) {
                debug("error encountered while reading file", err);
                return done(err);
            }

            less.render(str, opts, function (err, css) {
                if (err) {
                    debug("error encountered while rendering", err);
                    return done(err);
                }

                file.extension = "css";
                file.string = css;
                debug("css file rendered", file.filename);
                done();
            });
        });
    }
};
