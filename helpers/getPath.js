import { graphqlEndpoint } from '@config';

const getPath = (href = '') => {
    if (href && href !== '' && typeof window !== 'undefined') {
        const link = document.createElement('a');
        link.href = href;
        let path = link.pathname;
        if (path.includes('.html')) {
            path = path.split('.html');
            // eslint-disable-next-line prefer-destructuring
            path = path[0];
        }
        return path;
    }
    const env = process.env.APP_ENV === 'local' ? 'dev' : process.env.APP_ENV;
    let url = graphqlEndpoint[env] || 'dev';
    url = url.replace('/graphql', '');
    let path = href.replace('.html', '');
    path = path.replace(url, '');
    return path;
};

export default getPath;
