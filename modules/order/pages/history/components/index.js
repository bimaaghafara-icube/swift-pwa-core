/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@core_modules/customer/components/layout';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';
import { SkeletonContent } from './skeleton';
import useStyles from '../style';

const DefaultView = (props) => {
    const {
        data, t, page, storeConfig,
        pageSize, handleChangePage, handleChangePageSize, loadMore,
    } = props;
    const styles = useStyles();
    return (
        <Layout t={t} wishlist={[]}>
            <div>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">
                                    <Typography variant="span" type="bold">
                                        {t('order:order')}
                                        {' '}
                                        #
                                    </Typography>
                                </TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:date')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:shippedTo')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:orderTotal')}</Typography></TableCell>
                                <TableCell align="left"><Typography variant="span" type="bold">{t('order:status')}</Typography></TableCell>
                                <TableCell align="left">
                                    <Typography variant="span" type="bold">{t('order:action')}</Typography>
                                    {' '}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loadMore ? (
                                    <TableRow>
                                        <TableCell colSpan={6} rowSpan={10}>
                                            <SkeletonContent />
                                        </TableCell>
                                    </TableRow>
                                )
                                    : data && data.items.length > 0
                                        ? (
                                            <>
                                                {
                                                    data.items.map((val, index) => (
                                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {`${t('order:order')} #`}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:order')} #`}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.order_number}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:date')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {`${t('order:date')}`}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {formatDate(val.created_at, 'M/DD/YY')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:shippedTo')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:shippedTo')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span">
                                                                            {`${val.detail[0].shipping_address.firstname} `}
                                                                            {val.detail[0].shipping_address.lastname}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:orderTotal')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:orderTotal')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {formatPrice(val.grand_total, storeConfig.base_currency_code || 'IDR')}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:status')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:status')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={styles.value}>
                                                                        <Typography variant="span" letter="capitalize">
                                                                            {val.status_label}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={styles.tableCellResponsive}
                                                                align="left"
                                                                data-th={(
                                                                    <Typography align="center" type="bold" letter="capitalize">
                                                                        {t('order:action')}
                                                                    </Typography>
                                                                )}
                                                            >
                                                                <div className={styles.displayFlexRow}>
                                                                    <div className={styles.mobLabel}>
                                                                        <Typography align="center" type="bold" letter="capitalize">
                                                                            {t('order:action')}
                                                                        </Typography>
                                                                    </div>
                                                                    <div className={classNames(styles.value, styles.action)}>
                                                                        <Link
                                                                            href="/sales/order/view/order_id/[id]"
                                                                            as={`/sales/order/view/order_id/${val.order_number}`}
                                                                        >
                                                                            <a className={
                                                                                (val.detail[0].aw_rma && val.detail[0].aw_rma.status)
                                                                                    ? styles.linkView : ''
                                                                            }
                                                                            >
                                                                                <Typography variant="span" type="regular">
                                                                                    {t('order:view')}
                                                                                </Typography>
                                                                            </a>
                                                                        </Link>
                                                                        {
                                                                            (val.detail[0].aw_rma && val.detail[0].aw_rma.status)
                                                                        && (
                                                                            <Link
                                                                                href="/rma/customer/new/order_id/[id]"
                                                                                as={`/rma/customer/new/order_id/${val.order_number}`}
                                                                            >
                                                                                <a>
                                                                                    <Typography variant="span">{t('order:smReturn')}</Typography>
                                                                                </a>
                                                                            </Link>
                                                                        )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                                <TableRow>
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                                        colSpan={6}
                                                        count={data.total_count || 0}
                                                        rowsPerPage={pageSize}
                                                        page={page}
                                                        labelRowsPerPage="Limit"
                                                        SelectProps={{
                                                            inputProps: { 'aria-label': 'rows per page' },
                                                            native: true,
                                                        }}
                                                        onChangePage={handleChangePage}
                                                        onChangeRowsPerPage={handleChangePageSize}
                                                    />
                                                </TableRow>
                                            </>
                                        )

                                        : (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                                </TableCell>
                                            </TableRow>
                                        )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default DefaultView;
