/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
import { boomify, isBoom, Payload } from '@hapi/boom';
import { Request } from '@hapi/hapi';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(server: any) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }


    function promiseHandler(controllerObj: any, promise: any, request: any, successStatus: any, h: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }
                return returnHandler(h, statusCode, data, headers);;
            })
            .catch((error: any) => {
                if (isBoom(error)) {
                    throw error;
                }

                const boomErr = boomify(error instanceof Error ? error : new Error(error.message));
                boomErr.output.statusCode = error.status || 500;
                boomErr.output.payload = {
                    name: error.name,
                    message: error.message,
                } as unknown as Payload;
                throw boomErr;
            });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(h: any, statusCode?: number, data?: any, headers: any = {}) {
        if (h.__isTsoaResponded) {
            return h.__isTsoaResponded;
        }

        let response = data !== null && data !== undefined
                    ? h.response(data).code(200)
                    : h.response("").code(204);

        Object.keys(headers).forEach((name: string) => {
            response.header(name, headers[name]);
        });

        if (statusCode) {
            response.code(statusCode);
        }

        h.__isTsoaResponded = response;

        return response;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, h: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
            case 'request':
                return request;
            case 'query':
                return validationService.ValidateParam(args[key], request.query[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"})
            case 'path':
                return validationService.ValidateParam(args[key], request.params[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"})
            case 'header':
                return validationService.ValidateParam(args[key], request.headers[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body':
                return validationService.ValidateParam(args[key], request.payload, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body-prop':
                return validationService.ValidateParam(args[key], request.payload[name], name, errorFields, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'formData':
                return validationService.ValidateParam(args[key], request.payload[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'res':
                return responder(h);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(h: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
           returnHandler(h, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
