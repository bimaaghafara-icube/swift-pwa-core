import BannerView from '@common_banner';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import { withTranslation } from '@i18n';
import Core from './core';
import SkeletonView from './components/Skeleton';
import Content from './components';

const CategoryPage = (props) => (
    <Core
        BannerView={BannerView}
        BreadcrumbView={BreadcrumbView}
        TabView={TabView}
        SkeletonView={SkeletonView}
        Content={Content}
        {...props}
    />
);

export default withTranslation()(CategoryPage);
