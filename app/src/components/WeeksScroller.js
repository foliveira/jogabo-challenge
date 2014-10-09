define(function(require, exports, module) {
    'use strict';

    var ScrollContainer = require('famous/views/ScrollContainer');
    var WeeklyView = require('components/WeeklyView');

    function __setListeners() {
      /*eslint-disable no-wrap-func */
      this.scrollview.on('pageChange', (function(data) {
          var currentWeek = this.weeks[data.index];

          if (data.direction === 1 && data.index === this.weeks.length - 1) {
              var weekDay = new WeeklyView(currentWeek.weekIndex + 1);

              weekDay.pipe(this._eventOutput);

              this.weeks.push(weekDay);
          }

          this._eventOutput.emit('week-changed', { date: currentWeek.lastSelected.date });
      }).bind(this));

      this.on('day-selected', (function(d) {
          var dayIdx = d.date.day();

          for (var i = 0; i < this.weeks.length; ++i) {
            var weekday = this.weeks[i];

            weekday.days.forEach(function(d) {
              d.removeClass('selected');
            });

            weekday.days[dayIdx].addClass('selected');
          }
      }).bind(this));
      /*eslint-enable no-wrap-func */
    }

    function _createElements() {
      var weeksBufferSize = 5;
      var startingWeek = -Math.round(weeksBufferSize / 2);
      var maximumWeek = Math.abs(startingWeek);

      this.scrollview.sequenceFrom(this.weeks);

      for (var i = startingWeek, weekView; i < maximumWeek; ++i) {
        weekView = new WeeklyView(i, { size: [undefined, 75] });

        weekView.pipe(this._eventOutput);

        this.weeks.push(weekView);
      }

      //Start on the middle page
      this.scrollview.goToPage(Math.floor(weeksBufferSize) - 1);

      __setListeners.call(this);
    }

    function WeeksScroller() {
        ScrollContainer.apply(this, arguments);

        this.weeks = [];

        _createElements.call(this);
    }

    WeeksScroller.prototype = Object.create(ScrollContainer.prototype);
    WeeksScroller.prototype.constructor = WeeksScroller;

    module.exports = WeeksScroller;
});
