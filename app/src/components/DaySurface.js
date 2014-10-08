define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');

    var moment = require('moment');

    function DaySurface(dayIdx) {
        Surface.apply(this, arguments);

        this.date = moment().day(dayIdx);

        this.content = this.date.format('ddd DD');
        this.size = this.options.size;
        this.classes = [this.options.class];
        this.properties = {
          backgroundColor: this.options.backgroundColor,
          color: this.options.textColor,
          textAlign: 'center'
        };
    }

    DaySurface.prototype = Object.create(Surface.prototype);
    DaySurface.prototype.constructor = DaySurface;

    DaySurface.DEFAULT_OPTIONS = {
      size: [true, true],
      backgroundColor: '#20202a',
      textColor: '#cff700',
      class: 'day',
      selectedClass: 'selected-day'
    };

    module.exports = DaySurface;
});
