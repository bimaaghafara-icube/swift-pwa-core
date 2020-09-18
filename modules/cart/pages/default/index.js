import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import dynamic from 'next/dynamic';
import ItemView from './components/item';
import EmptyView from './components/empty';
import CrossSellView from './components/crosssell';
import SkeletonCart from './components/skeleton';
import EditDrawerView from './components/editDrawer';
import Content from './components';

const Core = dynamic(() => import('./core'), { ssr: false });

const Page = (props) => (

    <Core
        {...props}
        ItemView={ItemView}
        EmptyView={EmptyView}
        CrossSellView={CrossSellView}
        SkeletonView={SkeletonCart}
        EditDrawerView={EditDrawerView}
        Content={Content}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'cart'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
