import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Skeleton from './components/Skeleton';
import CoreBase from './core';
import WarningInfo from './components/Info';
import ItemProductView from './components/ItemProduct/views';
import ItemFieldView from './components/ItemField/view';
import OtherRmaLink from './components/ItemProduct/views/OtherRmaLink';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProductView={ItemProductView}
        ItemFieldView={ItemFieldView}
        OtherRmaLink={OtherRmaLink}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
