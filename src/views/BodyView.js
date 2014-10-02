define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function BodyView() {
        View.apply(this, arguments);
    }

    BodyView.prototype = Object.create(View.prototype);
    BodyView.prototype.constructor = BodyView;

    BodyView.DEFAULT_OPTIONS = {};

    module.exports = BodyView;
});
