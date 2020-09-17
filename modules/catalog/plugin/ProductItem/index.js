import Core from './core';
import ImageProductView from './components/Image';
import DetailProductView from './components/Detail';

const ProductItem = (props) => (
    <Core
        {...props}
        ImageProductView={ImageProductView}
        DetailProductView={DetailProductView}
    />
);

export default ProductItem;
