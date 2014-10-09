define(function(require, exports, module) {
    'use strict';

    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Utility = require('famous/utilities/Utility');

    var DaySurface = require('components/DaySurface');

    var moment = require('moment');

    function __setListenersOn(d) {
      /*eslint-disable no-wrap-func */
      d.on('click', (function() {
          this.lastSelected = d;
          this._eventOutput.emit('day-selected', { date: d.date });
      }).bind(this));
      /*eslint-enable no-wrap-func */

      d.pipe(this._eventOutput);
    }

    function _createLayout() {
      this.layout = new SequentialLayout({
        direction: Utility.Direction.X,
        properties: {
            backgroundColor: this.options.backgroundColor,
            color: this.options.textColor
        }
      });

      var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
      });

      this.add(layoutModifier).add(this.layout);
    }

    function _createElements() {
      this.days = [];

      for (var i = 0; i < 7; ++i) {
        var dayIndex = (7 * this.weekIndex) + i;
        var day = new DaySurface(dayIndex);

        __setListenersOn.call(this, day);

        if (moment().day() === day.date.day())
          this.lastSelected = day;

        this.days.push(day);
      }

      this.layout.sequenceFrom(this.days);
    }

    function WeeklyView(index, options) {
        View.apply(this, options);

        this.weekIndex = index;

        _createLayout.call(this);
        _createElements.call(this);
    }

    WeeklyView.prototype = Object.create(View.prototype);
    WeeklyView.prototype.constructor = WeeklyView;

    module.exports = WeeklyView;
});
