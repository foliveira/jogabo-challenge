define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick = require('famous/inputs/FastClick');
    var Utility = require('famous/utilities/Utility');
    var ScrollContainer = require('famous/views/ScrollContainer');

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
      headerSize: 44
    };

    function _createLayout() {
      this.layout = new HeaderFooter({
        headerSize: this.options.headerSize
      });

      var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
      });

      this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
          var backgroundSurface = new Surface({
              properties: {
                  backgroundColor: '#20202a'
              }
          });

          var backgroundModifier = new StateModifier({
              transform: Transform.behind
          });


        var arrowSurface = new ImageSurface({
            size: [44, 44],
            conten: '',
            classes: ["arrow-left-ico"]
        });

        var titleSurface = new Surface({
            size: [88, 44],
            content: 'Date & Time',
            properties: {
              color: '#cff700'
            }
        });

        var saveSurface = new Surface({
            size: [44, 44],
            content: 'save',
            properties: {
              color: '#fff'
            }
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
          content: "Oct, 14",
          size: [undefined, 20],
          properties: {
            backgroundColor: "#20202a",
            color: '#fff'
          }
        })

        this.dateScroll = new ScrollContainer({
            size : [undefined, 75],
            properties: {
              backgroundColor: "#20202a",
              color: '#fff'
            },
            scrollview : {
              paginated: true,
              groupScroll: true,
              direction: Utility.Direction.X
            }
        });
        var surfaces = [];
        this.dateScroll.sequenceFrom(surfaces);

        for (var i = 0, temp; i < 3; i++) {

            item = new Surface({
                 content: (i + 1),
                 size: [undefined, 50],
                 properties: {
                     backgroundColor: "hsl(" + (i * 360 / 3) + ", 100%, 50%)",
                     textAlign: "center"
                 }
            });

            surfaces.push(item);
        }

        this.gameDetails = new Surface({
          content: 'Game detail',
          size : [undefined, 78],
          properties: {
            backgroundColor: "#20202a",
            color: '#fff'
          },
        });

        this.hoursScroll = new ScrollContainer({
            size : [undefined, 374],
            properties: {
              backgroundColor: "#fff"
            },
            scrollview: {
              direction: Utility.Direction.Y
            }
        });
        var hours = [];
        this.hoursScroll.sequenceFrom(hours);
        function __getHours(i) {
          return moment().hour(Math.floor(i/2))
                          .minute(i*30%60)
                          .format("hh:mm A");
          }

        for (var i = 0, temp; i < 48; i++) {

            var item = new Surface({
                 content: __getHours(i),
                 size: [undefined, 40],
                 properties: {
                     backgroundColor: "hsl(" + (i * 360 / 48) + ", 100%, 50%)",
                     textAlign: "left"
                 }
            });

            hours.push(item);
        }

        var monthDetailModifier = new StateModifier({
          align: [0, 0.01],

        })
        var dateModifier = new StateModifier({
            align: [0, 0.05]
        });

        var detailsModifier = new StateModifier({
            align: [0, 0.15],
            transform: Transform.translate(0, 0, 0)
        });

        var hoursModifier = new StateModifier({
            align: [0, 0.05],
            //origin: [0, 0.3],
            transform: Transform.translate(0, 120, 0)
        });

        this.layout.content.add(monthDetailModifier).add(this.monthDetail);
        this.layout.content.add(dateModifier).add(this.dateScroll);
        this.layout.content.add(detailsModifier).add(this.gameDetails);
        this.layout.content.add(hoursModifier).add(this.hoursScroll);
    }

    module.exports = PageView;
});
