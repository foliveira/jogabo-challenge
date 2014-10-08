define(function(require, exports, module) {
    'use strict';

    var ScrollContainer = require('famous/views/ScrollContainer');
    var Surface = require('famous/core/Surface');
    var Utility = require('famous/utilities/Utility');
    var moment = require('moment');

    function __getHours(i) {
      return moment().hour(Math.floor(i/2)).minute(i*30%60).format('hh:mm A');
    }

    function __checkIfNextSelectableHour(h) {
      var hour = moment().hour(Math.floor(h.index / 2)).minute(h.index * 30 % 60);
      var currentHour = moment().format();

      if (!this.lastSelected && hour.diff(currentHour) > 0) {
          this.lastSelected = h.item;
          this.startIdx = h.index;
      }
    }

    function __setListenersOn(h) {

/*eslint-disable no-wrap-func */
      h.on('click', (function() {
          h.addClass('selected');

          if (this.lastSelected)
            this.lastSelected.removeClass('selected');

          this.lastSelected = h;
          this._eventOutput.emit('selected', { content: this.lastSelected.content });
      }).bind(this));
/*eslint-enable no-wrap-func */

      h.pipe(this);
    }

    function __setSelectedHour() {
      this.lastSelected = this.lastSelected || this.hours[0];
      this.startIdx = this.startIdx || 0;

      if (this.startIdx > 39)
        this.startIdx = 39;

      this.scrollview.setPosition(this.startIdx * 39.8);
      this.lastSelected.addClass('selected');

/*eslint-disable no-wrap-func */
      //delay firing this event so we can register at the main view and catch it
      //setTimeout((function() {
        this._eventOutput.emit('selected', { content: this.lastSelected.content });
      //}).bind(this));
/*eslint-enable no-wrap-func */
    }

    function _createElements() {
      this.scrollview.sequenceFrom(this.hours);

      for (var k = 0, hour; k < 48; ++k) {
          hour = new Surface({
              content: __getHours.call(this, k),
              size: [undefined, 40],
              classes: ['day'],
              properties: {
                  color: 'black',
                  backgroundColor: 'white',
                  textAlign: 'left'
              }
          });

          __checkIfNextSelectableHour.call(this, { item: hour, index: k });
          __setListenersOn.call(this, hour);

          this.hours.push(hour);
      }

      __setSelectedHour.call(this);
    }

    function HoursScroll() {
        ScrollContainer.apply(this, arguments);

        this.lastSelected = null;
        this.lastIndex = -1;
        this.hours = [];

        _createElements.call(this);
    }

    HoursScroll.prototype = Object.create(ScrollContainer.prototype);
    HoursScroll.prototype.constructor = HoursScroll;

    HoursScroll.DEFAULT_OPTIONS = {
      size: [undefined, true],
      backgroundColor: 'white',
      scrollview: {
        direction: Utility.Direction.Y,
        edgeGrip : 1
      }
    };

    module.exports = HoursScroll;
});
