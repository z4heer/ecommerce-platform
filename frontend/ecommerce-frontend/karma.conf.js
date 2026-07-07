module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],

        // Bind specifically to loopback to isolate the session
        hostname: '127.0.0.1',
        listenAddress: '127.0.0.1',

        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
            }
        },
        singleRun: true,
        concurrency: 1 // Force single execution environment boundary
    });
};