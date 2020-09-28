import ConfigurableOption from './components/configurable';
import ConfigurableView from './components/configurable/view';
import BundleView from './components/bundle/view';
import SimpleOption from './components/simple';
import VirtualOption from './components/virtual';
import BundleOption from './components/bundle';
import Footer from './Footer';

const Options = (props) => {
    const { data } = props;
    const [loading, setLoading] = React.useState(false);
    const { __typename } = data;
    return (
        <>
            {__typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                    loading={loading}
                    setLoading={setLoading}
                    ConfigurableView={ConfigurableView}
                    Footer={Footer}
                />
            )}

            {__typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                    loading={loading}
                    setLoading={setLoading}
                    Footer={Footer}
                />
            )}

            {__typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                    loading={loading}
                    setLoading={setLoading}
                    Footer={Footer}
                />
            )}

            {__typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                    loading={loading}
                    setLoading={setLoading}
                    BundleView={BundleView}
                    Footer={Footer}
                />
            )}
        </>
    );
};

export default Options;
