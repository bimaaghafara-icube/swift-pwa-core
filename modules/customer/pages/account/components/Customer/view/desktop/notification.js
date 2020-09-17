/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import formatDate from '@helpers/date';

const NotificationView = (props) => {
    const { notification, styles, t } = props;
    return (
        <>
            <h2 className={styles.infoTitle}>
                {t('customer:menu:notification')}
                <Link href="/inboxnotification/notification">
                    <a className={styles.desktopLinkHeader}>{t('customer:menu:viewall')}</a>
                </Link>
            </h2>
            <hr />
            <div className="row">
                <div className="col-lg-12">

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {notification.items ? (
                                    notification.items.map((val, idx) => {
                                        if (val.unread) {
                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell>{val.content}</TableCell>
                                                    <TableCell align="right">{formatDate(val.createdAt)}</TableCell>
                                                </TableRow>
                                            );
                                        }
                                        return null;
                                    })

                                ) : null }
                                {!notification.totalUnread || notification.totalUnread === 0
                                    ? (
                                        <TableRow>
                                            <TableCell align="center" colSpan="2">{t('customer:notHaveNotification')}</TableCell>
                                        </TableRow>
                                    )
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </>
    );
};

export default NotificationView;
