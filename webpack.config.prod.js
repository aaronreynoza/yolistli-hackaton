const CleanPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const config = {
    plugins: [
        new CleanPlugin(['build'], {
            allowExternal: true
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            // Exclude images from the precache
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // Match any request ends with .png, .jpg, .jpeg or .svg.
                handler: 'cacheFirst', // Apply a cache-first strategy.
                options: { // Use a custom cache name.
                    cacheName: 'images'
                },
            }]
        })
    ],
};

module.exports = config;
