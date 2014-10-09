define(function(require, exports, module) {
    'use strict';

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var HoursScroll = require('components/HoursScroll');
    var WeeksScroller = require('components/WeeksScroller');
    var Utility = require('famous/utilities/Utility');
    var moment = require('moment');

/*eslint-disable no-unused-vars */
    var FastClick = require('famous/inputs/FastClick');
/* eslint-enable no-unused-vars */

    function __dateChangedListner(d) {
      this.gameDayDetails.setContent(d.date.format('dddd MMMM Do'));
      this.monthDetail.setContent(d.date.format('MMM YY'));
    }

    function _createLayout() {
      this.layout = new HeaderFooter({
        headerSize: this.options.headerSize,
            properties: {
                backgroundColor: this.options.backgroundColor
            }
      });

      var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
      });

      this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: this.options.backgroundColor
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        var arrowSurface = new ImageSurface({
            content: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTkzLjU2OSA0Ny4yODNsLTE4Mi44NTcgMTgyLjg1OGMtMTQuMjgzIDE0LjI4MS0xNC4yODMgMzcuNDM4IDAgNTEuNzE5bDE4Mi44NTcgMTgyLjg1N2MxNC4yODIgMTQuMjgxIDM3LjQzOCAxNC4yODEgNTEuNzIgMCAxNC4yODMtMTQuMjgxIDE0LjI4My0zNy40MzggMC01MS43MTlsLTEyMC40MjgtMTIwLjQyN2gzNTAuNTY3YzIwLjE5OCAwIDM2LjU3Mi0xNi4zNzMgMzYuNTcyLTM2LjU3MSAwLTIwLjE5OC0xNi4zNzQtMzYuNTcxLTM2LjU3MS0zNi41NzFoLTM1MC41NjhsMTIwLjQyNy0xMjAuNDI3YzcuMTQxLTcuMTQxIDEwLjcxMi0xNi41MDEgMTAuNzEyLTI1Ljg1OXMtMy41Ny0xOC43MTktMTAuNzExLTI1Ljg1OWMtMTQuMjg0LTE0LjI4My0zNy40MzctMTQuMjgzLTUxLjcyLS4wMDF6Ii8+PC9zdmc+',
            size: [24, 28]
        });

        var titleSurface = new Surface({
            size: [88, true],
            content: 'Date & Time',
            classes: ['bolder'],
            properties: {
              color: this.options.textColor
            }
        });

        var saveSurface = new Surface({
            size: [44, true],
            content: 'Save'
        });

        var arrowModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var titleModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var saveModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

      this.layout.header.add(backgroundModifier).add(backgroundSurface);
      this.layout.header.add(arrowModifier).add(arrowSurface);
      this.layout.header.add(titleModifier).add(titleSurface);
      this.layout.header.add(saveModifier).add(saveSurface);
    }

    function _createBody() {
        this.monthDetail = new Surface({
          content: 'Oct 14',
          size: [undefined, 20],
          classes: ['month', 'bolder'],
          properties: {
            backgroundColor: this.options.backgroundColor
          }
        });

        this.dateScroll = new WeeksScroller({
          size: [undefined, 75],
          scrollview: {
            paginated: true,
            groupScroll: true,
            direction: Utility.Direction.X
          },
          properties: {
            backgroundColor: '#20202a'
          }
        });
        this.dateScroll.on('day-selected', __dateChangedListner.bind(this));
        this.dateScroll.on('week-changed', __dateChangedListner.bind(this));

        this.gameDayDetails = new Surface({
          content: moment().format('dddd MMMM Do'),
          size : [undefined, 78],
          properties: {
            backgroundColor: this.options.backgroundColor,
            color: this.options.textColor,
            textAlign: 'center'
          }
        });
        this.gameHourDetails = new Surface({
          content: moment().format('hh:mm A'),
          size : [undefined, 78],
          properties: {
            backgroundColor: this.options.backgroundColor,
            color: this.options.textColor,
            textAlign: 'center'
          }
        });
        var gameDayDetailsModifier = new StateModifier({
          transform: Transform.translate(0, 10, 0)
        });

        var gameHourDetailsModifier = new StateModifier({
          transform: Transform.translate(0, 35, 0)
        });
        this.gameDetails = new RenderNode();
        this.gameDetails.add(gameDayDetailsModifier).add(this.gameDayDetails);
        this.gameDetails.add(gameHourDetailsModifier).add(this.gameHourDetails);

        this.hoursScroll = new HoursScroll();

        /*eslint-disable no-wrap-func */
        this.hoursScroll.on('selected', (function(text) {
          this.gameHourDetails.setContent(text.content);
        }).bind(this));
        /*eslint-enable no-wrap-func */

        var dateModifier = new StateModifier({
            align: [0, 0.05]
        });

        var detailsModifier = new StateModifier({
            align: [0, 0.15]
        });

        var hoursModifier = new StateModifier({
            align: [0, 0.3],
            size: [undefined, 370]
        });

        this.layout.content.add(this.monthDetail);
        this.layout.content.add(dateModifier).add(this.dateScroll);
        this.layout.content.add(detailsModifier).add(this.gameDetails);
        this.layout.content.add(hoursModifier).add(this.hoursScroll);

    }

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
      headerSize: 44,
      backgroundColor: '#20202a',
      textColor: '#cff700'
    };

    module.exports = PageView;
});
