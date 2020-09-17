import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Router from 'next/router';
import Content from './components';
import Core from './core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async ({ query, res }) => {
    if (query.token === '' || !query.token) {
        if (typeof window !== 'undefined') Router.push('/');
        else res.redirect('/');
    }
    return {
        query,
        namespacesRequired: ['common', 'customer', 'validate'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
