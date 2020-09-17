import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import FeaturedSkeleton from './components/Skeleton/FeaturedSkeleton';
import BannerSliderSkeleton from './components/Skeleton/BannerSkeleton';
import ErrorInfo from './components/ErrorInfo';
import BannerView from './components/Banner/view';
import Content from './components';
import CategoryListView from './components/CategoryList/view';
import CategoryListSkeleton from './components/Skeleton/CategoryListSkeleton';
import FeaturedView from './components/FeaturedProducts/view';
import Core from './core';

const Page = (props) => (
    <Core
        FeaturedSkeleton={FeaturedSkeleton}
        BannerSliderSkeleton={BannerSliderSkeleton}
        ErrorInfo={ErrorInfo}
        BannerView={BannerView}
        Content={Content}
        CategoryListSkeleton={CategoryListSkeleton}
        CategoryListView={CategoryListView}
        FeaturedView={FeaturedView}
        {...props}
    />
);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'home'] });

export default withApollo({ ssr: true })(withTranslation()(Page));
