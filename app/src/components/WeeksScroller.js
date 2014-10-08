define(function(require, exports, module) {
    'use strict';

    var ScrollContainer = require('famous/views/ScrollContainer');
    var Utility = require('famous/utilities/Utility');
    var WeeklyView = require('components/WeeklyView');

    function __setListeners() {
/*eslint-disable no-wrap-func */
      this.scrollview.on('pageChange', (function(data) {
          var currentWeek = this.weeks[data.index];

          if (data.direction === 1) {
              this.weeks.push(new WeeklyView(currentWeek.weekIndex + 1));
              this.weeks.shift();
          }
          else {
              this.weeks.push(new WeeklyView(currentWeek.weekIndex - 1));
              this.weeks.pop();
          }
      }).bind(this));

      this.scrollview.on('click', (function() {
          window.console.log(Array.prototype.slice.call(arguments));
      }).call(this));
/*eslint-enable no-wrap-func */
    }

    function _createElements() {
      var weeksBufferSize = this.options.numberOfWeeks || 5;

      this.scrollview.sequenceFrom(this.weeks);

      for (var i = 0; i < weeksBufferSize; ++i)
          this.weeks.push(new WeeklyView(i));

      //Start on the middle page
      this.scrollview.goToPage(Math.floor(weeksBufferSize));

      __setListeners.call(this);
    }

    function WeeksScroller() {
        ScrollContainer.apply(this, arguments);

        this.weeks = [];
        this.size = [undefined, 75];

        this.scrollview.paginated = true;
        this.scrollview.groupScroll = true;
        this.scrollview.direction = Utility.Direction.X;

        _createElements.call(this);
    }

    WeeksScroller.prototype = Object.create(ScrollContainer.prototype);
    WeeksScroller.prototype.constructor = WeeksScroller;

    WeeksScroller.DEFAULT_OPTIONS = {
      numberOfWeeks: 5,
      properties: {
        backgroundColor: '#20202a'
      }
    };

    module.exports = WeeksScroller;
});
