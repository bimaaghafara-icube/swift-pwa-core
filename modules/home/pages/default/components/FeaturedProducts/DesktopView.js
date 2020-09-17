/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';

const DesktopView = ({ data = [] }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(data[0].name);
    const [products, setProduts] = React.useState([]);

    React.useEffect(() => {
        if (products.length === 0) {
            data.map((category) => {
                if (category.name === selectedCategory) {
                    const dataProduct = category.products.items.map((product) => ({
                        ...product,
                        name: product.name,
                        url: product.url_key,
                        imageSrc: product.small_image.url,
                        price: product.price_range.minimum_price.regular_price.value,
                    }));
                    setProduts(dataProduct);
                }
            });
        }
    }, []);

    const handleSelect = (name) => {
        data.map((category) => {
            if (category.name === name) {
                const dataProduct = category.products.items.map((product) => ({
                    ...product,
                    name: product.name,
                    url: product.url_key,
                    imageSrc: product.small_image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                }));
                setProduts(dataProduct);
            }
        });
        setSelectedCategory(name);
    };

    return (
        <div className="container container-fluid row">
            <div className="col-sm-12 col-md-12 col-lg-12 row center" style={{ marginBottom: 30, marginTop: 60 }}>
                {
                    data.map(({ name }, index) => (
                        <div className="col-sm-3 col-md-2 col-lg-2" key={index}>
                            <Button
                                variant={name === selectedCategory ? 'contained' : 'outlined'}
                                onClick={() => handleSelect(name)}
                            >
                                <Typography variant="span" color={name === selectedCategory ? 'white' : 'default'}>
                                    {name}
                                </Typography>
                            </Button>
                        </div>
                    ))
                }
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 row center">
                {
                    products.length > 0 && products.map((product, index) => (
                        <div className="col-sm-4 col-md-4 col-lg-3" key={index}>
                            <ProductItem
                                {...product}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default DesktopView;
