import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Skeleton from './components/Skeleton';
import CoreBase from './core';
import WarningInfo from './components/Info';
import Content from './components';

const Page = (props) => (
    <CoreBase
        Content={Content}
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
