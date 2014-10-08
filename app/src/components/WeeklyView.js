define(function(require, exports, module) {
    'use strict';

    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Utility = require('famous/utilities/Utility');

    var DaySurface = require('components/DaySurface');

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
        var day = new DaySurface((7 * this.weekIndex) + i);

        day.pipe(this);

        this.days.push(day);
      }

      this.layout.sequenceFrom(this.days);
    }

    function WeeklyView(index) {
        View.apply(this, arguments);

        this.weekIndex = index;
        this.size = [undefined, 75];

        _createLayout.call(this);
        _createElements.call(this);
    }

    WeeklyView.prototype = Object.create(View.prototype);
    WeeklyView.prototype.constructor = WeeklyView;

    WeeklyView.DEFAULT_OPTIONS = {
      properties: {
        backgroundColor: '#20202a',
        color: '#cff700'
      }
    };

    module.exports = WeeklyView;
});
