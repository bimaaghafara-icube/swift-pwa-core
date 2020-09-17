import TabView from '@common_tabs';
import CoreBase from './core';
import ErrorMessage from './components/ErrorMessage';
import ProductListSkeleton from './components/ProductListSkeleton';
import ImageProductView from '../ProductItem/components/Image';
import DetailProductView from '../ProductItem/components/Detail';
import ListColorView from './components/ListColor';
import ListSizeView from './components/ListSize';
import FilterView from './components/Filter/view';
import FilterModalView from './components/Filter/FilterDialog';

const Page = (props) => (
    <CoreBase
        ErrorMessage={ErrorMessage}
        ProductListSkeleton={ProductListSkeleton}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        ListColorView={ListColorView}
        ListSizeView={ListSizeView}
        TabView={TabView}
        FilterView={FilterView}
        FilterModalView={FilterModalView}
        {...props}
    />
);

export default Page;
