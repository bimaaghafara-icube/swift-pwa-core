/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Link from 'next/link';
import Button from '@common_button';
import router from 'next/router';
import {
    enableSocialMediaLink,
} from '@config';
import { setResolver } from '@helper_localstorage';
import SocialMediaLink from '../SocialMedia';
import SocialMediaView from '../SocialMedia/view';
import useStyles from './style';

const FooterView = (props) => {
    const styles = useStyles();
    const {
        t, isLogin, handleLogout, modules,
    } = props;
    const handleClick = async (link) => {
        await setResolver({
            type: 'CMS_PAGE',
        });
        router.push('/[...slug]', link);
    };
    return (
        <div className={styles.account_block}>
            <ul className={styles.account_navigation}>

                {
                    modules.about.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <>
                                <a
                                    onClick={() => handleClick('/about-us')}
                                    className={styles.account_navigation_link}
                                >
                                    {t('customer:menu:aboutUs')}
                                </a>
                            </>
                        </li>
                    ) : null
                }

                {
                    modules.contact.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/contact">
                                <a className={styles.account_navigation_link}>{t('customer:menu:contactUs')}</a>
                            </Link>
                        </li>
                    ) : null
                }

                {
                    modules.blog.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/blog">
                                <a className={styles.account_navigation_link}>{t('customer:menu:blog')}</a>
                            </Link>
                        </li>
                    ) : null

                }
                {
                    modules.confirmpayment.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/confirmpayment">
                                <a className={styles.account_navigation_link}>{t('customer:menu:confirmPayment')}</a>
                            </Link>
                        </li>
                    ) : null
                }
                {
                    modules.storeLocator.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/storelocator">
                                <a className={styles.account_navigation_link}>{t('customer:menu:findAStore')}</a>
                            </Link>
                        </li>
                    ) : null
                }
                {
                    modules.trackingorder.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/sales/order/track">
                                <a className={styles.account_navigation_link}>{t('customer:menu:trackingOrder')}</a>
                            </Link>
                        </li>
                    ) : null
                }

                {
                    isLogin
                        ? (
                            <li className={styles.account_navigation_item}>
                                <Button className={styles.account_navigation_link} onClick={handleLogout} variant="text">
                                    {t('customer:button:logout')}
                                </Button>
                            </li>
                        )
                        : null
                }
            </ul>
            {enableSocialMediaLink && <SocialMediaLink SocialMediaView={SocialMediaView} />}
        </div>
    );
};

export default FooterView;
