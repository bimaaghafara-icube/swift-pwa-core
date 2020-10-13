import { withTranslation } from '@i18n';
import Content from './components';
import Core from './core';

const Page = (props) => (
    <Core {...props} Content={Content} />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'product', 'category', 'validate', 'catalog'],
});

export default withTranslation()(Page);
