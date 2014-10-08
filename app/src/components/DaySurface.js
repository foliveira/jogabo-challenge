define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');
    var moment = require('moment');

    function DaySurface(dayIdx) {
        Surface.apply(this, arguments);

        this.date = moment().day(dayIdx);
        this.content = this.date.format('ddd') + '<br>' + this.date.format('DD');

        this.size = [45, 75];
        this.properties.backgroundColor = '#20202a';
        this.properties.color = '#cff700';
        this.properties.textAlign = 'center';

        this.addClass('day');
    }

    DaySurface.prototype = Object.create(Surface.prototype);
    DaySurface.prototype.constructor = DaySurface;

    DaySurface.DEFAULT_OPTIONS = {
      properties: {
      }
    };

    module.exports = DaySurface;
});
