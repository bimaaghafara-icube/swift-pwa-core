import { withTranslation } from '@i18n';
import Core from './core';
import Content from './components';

const Top = (props) => <Core {...props} Content={Content} />;

Top.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation()(Top);
