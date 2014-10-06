define(function(require, exports, module) {
    var View = require('famous/core/View');
    var StateModifier = require('famous/modifiers/StateModifier');

    var PageView = require('views/PageView');

    function _createPageView() {
      this.pageView = new PageView();
      this.pageModifier = new StateModifier();

      this.add(this.pageModifier).add(this.pageView);
    }

    function AppView() {
        View.apply(this, arguments);

        _createPageView.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {};

    module.exports = AppView;
});
