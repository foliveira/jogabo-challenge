define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');

    var StateModifier = require('famous/modifiers/StateModifier');

    var ScrollContainer = require('famous/views/ScrollContainer');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');

    var ImageSurface = require('famous/surfaces/ImageSurface');

    var FastClick = require('famous/inputs/FastClick');

    var Utility = require('famous/utilities/Utility');

    var moment = require('moment');

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

    function _createLayout() {
      this.layout = new HeaderFooter({
        headerSize: this.options.headerSize,
            properties: {
                backgroundColor: '#20202a'
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
            content: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTkzLjU2OSA0Ny4yODNsLTE4Mi44NTcgMTgyLjg1OGMtMTQuMjgzIDE0LjI4MS0xNC4yODMgMzcuNDM4IDAgNTEuNzE5bDE4Mi44NTcgMTgyLjg1N2MxNC4yODIgMTQuMjgxIDM3LjQzOCAxNC4yODEgNTEuNzIgMCAxNC4yODMtMTQuMjgxIDE0LjI4My0zNy40MzggMC01MS43MTlsLTEyMC40MjgtMTIwLjQyN2gzNTAuNTY3YzIwLjE5OCAwIDM2LjU3Mi0xNi4zNzMgMzYuNTcyLTM2LjU3MSAwLTIwLjE5OC0xNi4zNzQtMzYuNTcxLTM2LjU3MS0zNi41NzFoLTM1MC41NjhsMTIwLjQyNy0xMjAuNDI3YzcuMTQxLTcuMTQxIDEwLjcxMi0xNi41MDEgMTAuNzEyLTI1Ljg1OXMtMy41Ny0xOC43MTktMTAuNzExLTI1Ljg1OWMtMTQuMjg0LTE0LjI4My0zNy40MzctMTQuMjgzLTUxLjcyLS4wMDF6Ii8+PC9zdmc+",
            size: [24, 28]
        });

        var titleSurface = new Surface({
            size: [88, true],
            content: '<b>Date & Time</b>',
            properties: {
              color: this.options.textColor
            }
        });

        var saveSurface = new Surface({
            size: [44, true],
            content: 'save'
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
          content: "<b>Oct 14</b>",
          size: [undefined, 20],
          classes: ['month'],
          properties: {
            backgroundColor: this.options.backgroundColor
          }
        })

        this.dateScroll = new ScrollContainer({
            size : [undefined, 75],
            properties: {
              backgroundColor: this.options.backgroundColor
            },
            scrollview : {
              paginated: true,
              groupScroll: true,
              direction: Utility.Direction.X
            }
        });
        var surfaces = [];
        this.dateScroll.sequenceFrom(surfaces);

        var self = this;
        function __createItem(i) {
            var node = new RenderNode();
            for(var j = 0; j < 7; ++j)
            {
                var modifier = new StateModifier({
                    transform: Transform.translate(j * (320 / 7), 0, 0)
                });
                node.add(modifier).add(new Surface({
                    content: (j + 1) * i,
                    size: [10, 50],
                    properties: {
                        backgroundColor: self.options.backgroundColor,
                        textAlign: 'center'
                    }
                }));
            }

            return node;
        };

        for (var i = 0; i < 3; ++i) {
            surfaces.push(__createItem(i));
        }

        this.gameDayDetails = new Surface({
          content: moment().format('dddd MMMM Do'),
          size : [undefined, 78],
          properties: {
            backgroundColor: this.options.backgroundColor,
            color: this.options.textColor,
            textAlign: 'center'
          },
        });
        this.gameHourDetails = new Surface({
          content: moment().format('hh:mm A'),
          size : [undefined, 78],
          properties: {
            backgroundColor: this.options.backgroundColor,
            color: this.options.textColor,
            textAlign: 'center'
          },
        });
        var gameDayDetailsModifier = new StateModifier({
          transform: Transform.translate(0, 10, 0)
        })

        var gameHourDetailsModifier = new StateModifier({
          transform: Transform.translate(0, 35, 0)
        })
        this.gameDetails = new RenderNode();
        this.gameDetails.add(gameDayDetailsModifier).add(this.gameDayDetails);
        this.gameDetails.add(gameHourDetailsModifier).add(this.gameHourDetails);

        this.hoursScroll = new ScrollContainer({
            size : [undefined, true],
            scrollview: {
              direction: Utility.Direction.Y
            }
        });
        var hours = [];
        this.hoursScroll.sequenceFrom(hours);
        function __getHours(i) {
          return moment().hour(Math.floor(i/2))
                          .minute(i*30%60)
                          .format('hh:mm A');
          }

        var lastSelected = null;
        var startIdx = 0;
        for (var i = 0, item; i < 48; ++i) {

            item = new Surface({
                content: __getHours(i),
                size: [undefined, 40],
                classes: ['hour'],
                properties: {
                    color: 'black',
                    backgroundColor: 'white',
                    textAlign: 'left'
                }
            });
            if(!lastSelected && moment().hour(Math.floor(i/2))
                            .minute(i*30%60).diff(moment().hours(23).format()) > 0)
                            {
                                lastSelected = item;
                                startIdx = (function() { return i; })();
                            }

            var self = this;
            item.on('click', function() {
                self.gameHourDetails.setContent(this.content);
                this.addClass('selected');
                if(lastSelected)
                  lastSelected.removeClass('selected');
                lastSelected = this;
            });

            item.pipe(this.hoursScroll);
            hours.push(item);
        }
        lastSelected = lastSelected || hours[0];
        startIdx = startIdx || 0;
        if(startIdx > 39) startIdx = 39;
        this.hoursScroll.scrollview.setPosition(startIdx * 39.8);
        this.gameHourDetails.setContent(lastSelected.content);
        lastSelected.addClass('selected');

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

    module.exports = PageView;
});
