var path = require('path');
module.exports = function(sails) {

  return {

    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {

      __configKey__: {
        // Turn babel compile on by default
        compile: true,
        // Activates preset tranformations
        presets: ['es2015', 'stage-2', 'react'],
        //can be false or a regex. Defaults to node_modules in babel
        ignore: null,
        //can be any regex. Only these files will be transpiled
        only: null,
        //an array of extensions, defaults to [".es6", ".es", ".jsx", ".js"] in babel
        extensions: null
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    configure: function() {

      // If the hook has been deactivated, just return
      if (!sails.config[this.configKey].compile) {
        sails.log.verbose("Babel hook deactivated.");
      } else {

        // Load babel
        var options = {};

        if (sails.config[this.configKey].presets && sails.config[this.configKey].presets.length > 0) {
          options.presets = sails.config[this.configKey].presets;
        }

        if (sails.config[this.configKey].ignore !== null) {
          options.ignore = sails.config[this.configKey].ignore;
        }

        if (sails.config[this.configKey].only) {
          options.only = sails.config[this.configKey].only;
        }

        if (sails.config[this.configKey].extensions) {
          options.extensions = sails.config[this.configKey].extensions;
        }

        require("babel-core/register")(options);

        sails.log.verbose("Babel hook activated. Enjoy ES6/7 power in your Sails app.");
      }
    },

  };

};