import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Content from './components';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withApollo({ ssr: true })(withTranslation()(Page));
