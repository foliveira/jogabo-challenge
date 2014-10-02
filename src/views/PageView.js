define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter = require('famous/views/HeaderFooterLayout');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick = require('famous/inputs/FastClick');

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
        this.bodySurface = new Surface({
            size : [undefined, undefined],
            properties: {
              backgroundColor: "#00000a"
            }
        });


        this.layout.content.add(this.bodySurface);
    }

    module.exports = PageView;
});
