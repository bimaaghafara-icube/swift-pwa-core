import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import CoreBase from './core';
import Skeleton from './components/Skeleton';
import WarningInfo from './components/Info';
import ItemProduct from './components/ItemProduct';
import ListMessage from './components/ListMessage';
import ItemFieldView from './components/ItemField/view';
import FormComment from './components/FormComment';
import Detail from './components/Detail';
import Footer from './components/Footer';

const Page = (props) => (
    <CoreBase
        Loader={Skeleton}
        WarningInfo={WarningInfo}
        ItemProduct={ItemProduct}
        ListMessage={ListMessage}
        ItemFieldView={ItemFieldView}
        FormComment={FormComment}
        Detail={Detail}
        Footer={Footer}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['rma', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
