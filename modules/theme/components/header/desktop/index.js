import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Content from './components';

const Top = (props) => <Core {...props} Content={Content} />;

Top.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withApollo({ ssr: true })(withTranslation()(Top));
