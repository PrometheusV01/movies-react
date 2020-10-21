import { MyError } from './fn/Error';

const DEFAULT_HEADERS = {
    "Accept":       'application/json;q=0.9',
    "Content-Type": 'application/json',
};
const API = '/api/';

export default class BaseApiClass {
    constructor ({ url, method, successCode = 200, pathParams = null, queryParams = null, bodyParams = null }) {
        this._url = url;
        this._method = method;
        this._successCode = successCode;
        this._pathParams = pathParams;
        this._queryParams = queryParams;
        this._bodyParams = bodyParams;
    }

    _load = async () => {
        const url = API + this._proccessUrl();
        const body = this._proccessBody();

        try {
            const response = await fetch(url, {
                method:  this._method,
                headers: { ...this.proccessHeaders(DEFAULT_HEADERS) },
                ...body,
            });

            const { status } = response;

            if (status === this._successCode) {
                const responseBody = await BaseApiClass.getResponseBody(response);

                return this.parseBodyToClientSchema(responseBody);
            }

            throw response;
        } catch (responseError) {
            const { status } = responseError;
            const responseBody = await BaseApiClass.getResponseBody(responseError);

            throw new MyError({ status, body: responseBody });
        }
    }

    _proccessUrl () {
        let url = this._url;

        if (this._pathParams) {
            url = BaseApiClass.compilePathParams(url, this._pathParams);
        }

        if (this._queryParams) {
            url += '?';
            url = Object.keys(this._queryParams).reduce((string, paramKey, index) => {
                const value = this._queryParams[paramKey];
                const ampersand = index ? '&' : '';

                return `${string}${ampersand}${paramKey}=${value}`;
            }, url);
        }

        return url;
    }

    _proccessBody = () => {
        if (!this._bodyParams) {
            return {};
        }

        if (this._bodyParams instanceof FormData) {
            return { body: this._bodyParams };
        }

        if (typeof this._bodyParams !== 'object') {
            throw new Error('[bodyParams] is not a Object!!!');
        }

        return { body: JSON.stringify(this.converBodyToServerSchema(this._bodyParams)) };
    }

    converBodyToServerSchema = (bodyParams) => {
        // this is abstract method
        return bodyParams;
    }

    parseBodyToClientSchema = (data) => {
        // this is abstract method
        return data;
    }

    proccessHeaders = (baseHeaders) => {
        // this is abstract method

        return baseHeaders;
    }

    static compilePathParams = (url, pathParams) => {
        if (typeof pathParams !== 'object') {
            // eslint-disable-next-line no-throw-literal
            throw new Error('[pathParams] is not a Object');
        }

        return Object.keys(pathParams).reduce((string, paramKey) => {
            const value = pathParams[paramKey];


            if (!string.includes(`{:${paramKey}}`)) {
                // eslint-disable-next-line no-throw-literal
                throw new Error(`This paramKey [${paramKey}] dont find in this string [${string}]`);
            }

            return string.replace(`{:${paramKey}}`, value);
        }, url);
    }

    static getResponseBody = async (response) => {
        const { status, headers } = response;
        const contentType = headers.get('content-type');

        if (status === 204) {
            return null;
        }

        let parseMethods = '';

        switch (contentType) {
            case 'application/json; charset=utf-8': {
                parseMethods = 'json';
                break;
            }
            default: parseMethods = 'text';
        }

        try {
            const body = await response[parseMethods]();

            return body;
        } catch (error) {
            __DEV__ && console.info(error);

            return null;
        }
    }

}
