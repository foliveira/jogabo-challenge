/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        moment: '../lib/moment/moment'
    },
    packages: [

    ]
});
require(['main']);
