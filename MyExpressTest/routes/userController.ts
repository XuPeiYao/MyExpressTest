"use strict";
import * as express from 'express';


//#region Routing

function routing(path: string) {
    return function (
        target: any, // The class the decorator is declared on
        propertyKey?: string,
        descriptor?: PropertyDescriptor
    ) {
        target.attributes = target.attributes || {};
        target.attributes.routing = path;

        if (descriptor && descriptor.value) {
            descriptor.value.attributes = descriptor.value.attributes || {};
            descriptor.value.attributes.routing = path;
        }
    }
}

//#endregion

export class Controller {
    public request: express.Request;
    public response: express.Response;

    public onRouting(req: express.Request, res: express.Response): any {
        this.request = req;
        this.response = res;

        /*var method = req.path.substring(req.route.path.length - 1);

        var index = method.indexOf('?');
        if (index == -1) index = method.length;*/
        var method = req.params[0];//method.substring(0, index);

        for (var key in this) {
            if (!(this[key] instanceof Function)) continue;
            if (key == 'constructor') continue;
            if (key == 'onRouting') continue;

            if (!this[key].attributes) continue;
            if (this[key].attributes.routing != method) continue;
            
            res.json(this[key]());
            return;
        }   

        res.json(this[method]());
    }
}

@routing('/api/user/')
export class userController extends Controller {
    @routing('echo')
    public test(): any {
        return { "echo" : this.request.query.value };
    }
}
