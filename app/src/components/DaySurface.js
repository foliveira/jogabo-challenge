define(function(require, exports, module) {
    'use strict';

    var Surface = require('famous/core/Surface');
    var moment = require('moment');

    function __styleSurface() {
      this.addClass('day');

      if (this.date.isBefore(moment()))
        this.addClass('faded');

      if (moment().day() === this.date.day())
        this.addClass('selected');
    }

    function DaySurface(dayIdx) {
        Surface.apply(this, [{
          size: [45, 75],
          properties: {
            backgroundColor: '#20202a',
            color: 'white',
            textAlign: 'center'
          }
        }]);

        this.date = moment().day(dayIdx);
        this.content = this.date.format('ddd') + '<br>' + this.date.format('DD');

        __styleSurface.call(this);
    }

    DaySurface.prototype = Object.create(Surface.prototype);
    DaySurface.prototype.constructor = DaySurface;

    module.exports = DaySurface;
});
