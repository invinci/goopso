'use strict';

let serverUrl = 'https://tangential-span-155900.appspot-preview.com/',
    localUrl = 'http://192.168.0.103:5000/';

let runningUrl = serverUrl;

class Connection {

    static getBaseurl() {

        return runningUrl;
    };

    static getResturl() {

        return `${runningUrl}v1/`;
    };
}

module.exports = Connection;
