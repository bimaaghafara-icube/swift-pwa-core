import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Content from './components';

const DefaultMiniCart = (props) => <Core {...props} Content={Content} />;

DefaultMiniCart.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultMiniCart));
