import Core from './core';
import ImageProductView from './components/Image';
import DetailProductView from './components/Detail';
import LabelView from './components/LabelView';

const ProductItem = (props) => (
    <Core
        {...props}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
        LabelView={LabelView}
    />
);

export default ProductItem;
