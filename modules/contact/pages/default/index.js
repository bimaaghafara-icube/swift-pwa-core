import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Skeleton from './components/skeleton';
import Content from './components';
import ErrorInfo from './components/ErrorInfo';
import Core from './core';

const Page = (props) => (<Core {...props} Content={Content} ErrorInfo={ErrorInfo} Skeleton={Skeleton} />);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'contact', 'validate'] });

export default withApollo({ ssr: true })(withTranslation()(Page));
