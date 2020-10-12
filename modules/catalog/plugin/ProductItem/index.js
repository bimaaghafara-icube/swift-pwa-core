import Core from './core';
import ImageProductView from './components/Image';
import DetailProductView from './components/Detail';
import LabelView from './components/LabelView';
import ConfigurableView from './components/ConfigurableProductItem/view';

const ProductItem = (props) => (
    <Core
        {...props}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        LabelView={LabelView}
        ConfigurableView={ConfigurableView}
    />
);

export default ProductItem;
