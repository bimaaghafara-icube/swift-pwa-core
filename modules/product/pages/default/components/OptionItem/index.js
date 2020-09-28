/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
// import Router from 'next/router';
import React from 'react';
import ConfigurableOption from './components/configurable';
import ConfigurableView from './components/configurable/view';
import BundleView from './components/bundle/view';
import SimpleOption from './components/simple';
import VirtualOption from './components/virtual';
import BundleOption from './components/bundle';
import useStyles from './style';
import Footer from './Footer';

const Transition = React.forwardRef((props, ref) => (
    <Fade ref={ref} {...props} />
));

const OptionDialog = (props) => {
    const {
        open,
        setOpen,
        data: { __typename },
    } = props;
    const styles = useStyles();
    const [loading, setLoading] = React.useState(false);

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                PaperProps={{
                    className: styles.dialog,
                }}
            >
                <div className={styles.root}>
                    <div
                        className={styles.bannerContainer}
                        onClick={() => !loading && setOpen()}
                    />
                    <div className={styles.optionContainer}>
                        {__typename === 'ConfigurableProduct' && (
                            <ConfigurableOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                                ConfigurableView={ConfigurableView}
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
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OptionDialog;
