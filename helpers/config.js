/* eslint-disable import/prefer-default-export */
const { HOST, graphqlEndpoint } = require('../../swift.config');

const getHost = () => {
    const globalHost = HOST[process.env.APP_ENV] || HOST.dev;
    return globalHost;
};

const getStoreHost = () => {
    let storeHost = graphqlEndpoint[process.env.APP_ENV] || graphqlEndpoint.dev;
    storeHost = storeHost.replace('graphql', '');
    return storeHost;
};

module.exports = { getHost, getStoreHost };
