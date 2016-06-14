"use strict";
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
var controllers = {};
require("fs").readdirSync(path.join(__dirname, 'routes'))
    .forEach(function (file) {
    if (file.split('.').reverse()[0] != 'js')
        return;
    var ns = require("./routes/" + file);
    for (var key in ns) {
        if (key.lastIndexOf('Controller') != (key.length - 'Controller'.length) ||
            key.lastIndexOf('Controller') == 0) {
            continue;
        }
        controllers[key] = ns[key];
        app.get(controllers[key].attributes.routing + '*', function (req, res) {
            (new controllers[key]()).onRouting(req, res);
        });
    }
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map