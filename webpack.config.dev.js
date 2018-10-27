const path = require('path');

const config = {
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        overlay: {
            errors: true,
            warnings: false
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
};

// Export a merge of base- and dev/prod- config
module.exports = config;
