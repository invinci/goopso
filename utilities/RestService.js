'use strict';

import querystring from 'querystring';
import base64 from 'base-64';
import Connection from './Connection';

class RestService {

    static postHttp(Api, params) {
        return new Promise(function(fulfill, reject) {
            fetch(`${Connection.getResturl()}${Api}`, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(params) })
                .then((response) => response.status === 200 ? response.text() : response.text())
                .then((responseText) => {
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    console.warn(error);
                });
        });

    };

    static getHttp(Api, params) {

        return new Promise(function(fulfill, reject) {
            let query = querystring.stringify(params);
            fetch(`${Connection.getResturl()}${Api}?${query}`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
                .then((response) => response.status === 200 ? response.text() : response.text())
                .then((responseText) => {
                    //console.log('Inside get http ',responseText);
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    reject(error);
                    // console.warn(error);
                });
        });

    };

    static putHttp(Api, params) {

        return new Promise(function(fulfill, reject) {
            fetch(`${Connection.getResturl()}${Api}`, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(params) })
                .then((response) => response.status === 200 ? response.text() : response.text())
                .then((responseText) => {
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    console.warn(error);
                });
        });

    };

    static postTokenHttp(Api, token, params) {

        return new Promise(function(fulfill, reject) {
            fetch(`${Connection.getResturl()}${Api}`, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'token': token }, body: JSON.stringify(params) })
                .then((response) => response.status === 200 ? response.text() : false)
                .then((responseText) => {
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    console.warn(error);
                });
        });

    };

    static getTokenHttp(Api, token, params) {

        return new Promise(function(fulfill, reject) {
            let query = querystring.stringify(params);
            fetch(`${Connection.getResturl()}${Api}?${query}`, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'token': token } })
                .then((response) => response.status === 200 ? response.text() : false)
                .then((responseText) => {
                    //console.log('for token '+Api+' inside get token ',responseText);
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    reject(error);
                    // console.warn(error);
                });
        });

    };

    static deleteHttp(Api, params) {

        return new Promise(function(fulfill, reject) {
            let query = querystring.stringify(params);
            fetch(`${Connection.getResturl()}${Api}?${query}`, { method: 'DELETE', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
                .then((response) => response.status === 200 ? response.text() : response.text())
                .then((responseText) => {
                    //console.log('Inside get http ',responseText);
                    fulfill(JSON.parse(responseText));
                })
                .catch((error) => {
                    reject(error);
                    // console.warn(error);
                });
        });

    };

}

export default RestService;
