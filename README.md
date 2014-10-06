#jogabo-challenge
> A challenge from the JOGABO guys.

[![Build Status](https://travis-ci.org/foliveira/jogabo-challenge.svg?branch=master)](https://travis-ci.org/foliveira/jogabo-challenge) [![Dependency Status](https://david-dm.org/foliveira/jogabo-challenge.svg)](https://david-dm.org/foliveira/jogabo-challenge) [![devDependency Status](https://david-dm.org/foliveira/jogabo-challenge/dev-status.svg)](https://david-dm.org/foliveira/jogabo-challenge#info=devDependencies)

##Dependencies
It is actually quite simple really

First make sure you have node.js installed... without that nothing works!  You can either install it with your favorite package manager or with [the installer](http://nodejs.org/download) found on [nodejs.org](http://nodejs.org).

This project relies on grunt-cli, and bower to do all the heavy lifting for you

```
npm install -g grunt-cli bower
```

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

If you would like to have your server be accessible to other devices on your local machine use the option ```--hostname=0.0.0.0```

If you don't like your browser being opened for use a ```--no-open``` flag to disable the feature

##Production

If you would like to compile your project for distribution simply run the command ```grunt``` to build ```dist/``` which will be a deployment ready version of your app.  Preprocessing will be applied to html, all js will be concatenated and minified.  All js / css assets will also have their name prepended with a hash for cache busting.

##License
ISC
