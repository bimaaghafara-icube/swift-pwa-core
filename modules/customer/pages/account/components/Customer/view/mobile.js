import Link from 'next/link';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import Typography from '@common_typography';
import PointCard from '@core_modules/rewardpoint/plugins/info';
import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Footer from '../../Footer';
import FooterView from '../../Footer/view';
import useStyles from '../style';

const ViewMobile = (props) => {
    const {
        userData, t, menu, totalUnread, wishlist, modules,
    } = props;
    const styles = useStyles();
    const StyledBadge = withStyles(() => ({
        badge: {
            right: -4,
            top: 4,
        },
    }))(Badge);
    return (
        <div className={classNames(styles.root, 'hidden-desktop')}>
            <div className={styles.account_wrapper}>
                <div className={[styles.account_block, styles.padding_vertical_40, styles.border_bottom].join(' ')}>
                    <h3 className={styles.account_username}>
                        {userData && userData.customer && `${userData.customer.firstname} ${userData.customer.lastname}`}
                    </h3>
                    <p className={styles.account_email}>{userData && userData.customer && userData.customer.email}</p>
                </div>
                <div className={[styles.account_block, styles.padding_vertical_40].join(' ')}>
                    {
                        modules.rewardpoint.enabled ? (
                            <PointCard {...props} />
                        ) : null
                    }
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            {
                                menu.map(({ href, title }, index) => (
                                    <li className={styles.account_navigation_item} key={index}>
                                        <Link href={href}>
                                            <a className={styles.account_navigation_link}>
                                                <StyledBadge
                                                    color="secondary"
                                                    max={99}
                                                    invisible={!href.includes('notification') || !totalUnread}
                                                    badgeContent={totalUnread}
                                                >
                                                    {title}
                                                </StyledBadge>
                                            </a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {
                    wishlist.length > 0 ? (
                        <div className={[styles.account_block, styles.wishlistBlock].join(' ')}>
                            <div className={styles.account_clearfix}>
                                <div className={styles.spanWishlist}>
                                    <Typography variant="span" type="bold" letter="capitalize" className={styles.account_wishlist_title}>
                                        Wishlist
                                    </Typography>
                                    <Link
                                        href="/wishlist"
                                    >
                                        <a
                                            className={[styles.account_wishlist_read_more].join(' ')}
                                        >
                                            <Typography
                                                variant="span"
                                                type="bold"
                                                letter="capitalize"
                                            >
                                                {t('customer:menu:readMore')}
                                            </Typography>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            {modules.wishlist.enabled ? (
                                <div className={styles.account_clearfix}>
                                    <Carousel
                                        data={wishlist}
                                        className={[styles.wishlistBlock, styles.margin20].join(' ')}
                                        Item={ProductItem}
                                    />
                                </div>
                            ) : null}

                        </div>
                    ) : (
                        <span className={styles.span} />
                    )
                }
                <Footer {...props} FooterView={FooterView} />
            </div>
        </div>
    );
};

export default ViewMobile;
