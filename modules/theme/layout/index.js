/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { custDataNameCookie, features } from '@config';
import { getHost } from '@helper_config';
import { breakPointsUp } from '@helper_theme';
import { BREAKPOINTS } from '@theme_vars';

import PopupInstallAppMobile from '../components/custom-install-popup/mobile';

const BottomNavigation = dynamic(() => import('@common_bottomnavigation'), { ssr: false });
const HeaderMobile = dynamic(() => import('@common_headermobile'));
const HeaderDesktop = dynamic(() => import('@common_headerdesktop'), { ssr: true });
const Message = dynamic(() => import('@common_toast'), { ssr: false });
const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const ScrollToTop = dynamic(() => import('@common_scrolltotop'), { ssr: false });
const Footer = dynamic(() => import('@common_footer'), { ssr: true });

const Layout = (props) => {
    const {
        pageConfig,
        children,
        CustomHeader = false,
        i18n, storeConfig = {},
        isLogin,
        headerProps = {},
        t,
    } = props;
    const {
        ogContent = {}, schemaOrg = null, headerDesktop = true, footer = true,
    } = pageConfig;
    const router = useRouter();
    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: '',
            text: '',
        },
        backdropLoader: false,
    });
    // const [mainMinimumHeight, setMainMinimumHeight] = useState(0);
    const refFooter = useRef(null);
    const refHeader = useRef(null);

    const handleSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    const ogData = {
        'og:title': pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa',
        'og:image': storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}/assets/img/swift-logo.png`,
        'og:image:type': 'image/png',
        'og:url': `${getHost()}${router.asPath}`,
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        'og:type': 'website',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description || '';
    }

    if (features.facebookMetaId.enabled) {
        ogData['fb:app_id'] = features.facebookMetaId.app_id;
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) tagManagerArgs.dataLayer.customerId = custData.email;
            TagManager.dataLayer(tagManagerArgs);
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);
    }, []);

    const desktop = breakPointsUp('sm');

    // for checking layout
    const sm = breakPointsUp(BREAKPOINTS.sm);
    const md = breakPointsUp(BREAKPOINTS.md);
    const lg = breakPointsUp(BREAKPOINTS.lg);

    const checkResolution = () => {
        if (headerDesktop) {
            if (lg) { return '175px'; }
            if (md) { return '175px'; }
            if (sm) { return '170px'; }
        }
        return 0;
    };

    const styles = {
        marginTop: checkResolution(),
        marginBottom: pageConfig.bottomNav ? '60px' : 0,
    };

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content={pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}
                />
                <meta name="robots" content="INDEX,FOLLOW" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="description" content={ogData['og:description']} />
                {Object.keys(ogData).map((key, idx) => {
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        return <meta name={`${key}`} content={ogData[key].value} key={idx} />;
                    }
                    return <meta property={`${key}`} content={ogData[key]} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}</title>
                {schemaOrg
                    ? (
                        schemaOrg.map((val, idx) => (
                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                        ))
                    ) : null}
            </Head>
            <header ref={refHeader}>
                <div className="hidden-mobile">
                    {headerDesktop ? (<HeaderDesktop storeConfig={storeConfig} isLogin={isLogin} t={t} />) : null}
                </div>
                <div className="hidden-desktop">
                    {
                        React.isValidElement(CustomHeader)
                            ? <>{React.cloneElement(CustomHeader, { pageConfig, ...headerProps })}</>
                            : <HeaderMobile {...headerProps} pageConfig={pageConfig} />
                    }
                </div>
            </header>
            {features.customInstallApp.enabled ? <PopupInstallAppMobile /> : null}

            <main style={{ ...styles }} id="maincontent">
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                {children}
                {desktop ? <ScrollToTop {...props} /> : null}
            </main>
            <footer ref={refFooter}>
                <div className="hidden-mobile">
                    {
                        footer ? (
                            <Footer
                                storeConfig={storeConfig}
                            />
                        ) : null
                    }
                </div>
                {
                    desktop
                        ? null
                        : <BottomNavigation active={pageConfig.bottomNav} />
                }
            </footer>
        </>
    );
};

export default Layout;
