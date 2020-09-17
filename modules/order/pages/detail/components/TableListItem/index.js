import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helpers/currency';
import Alert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import useStyles from './style';

const TableListProduct = ({
    data, t, currency, detail,
}) => {
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                #
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                {t('common:product:titleProduct')}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                SKU
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:price')}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:shortQty')}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {t('common:subtotal')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        <>
                            {
                                data.map((val, index) => (
                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                        <TableCell
                                            align="center"
                                        >
                                            <div className={styles.productImgContainer}>
                                                <img
                                                    src={val.image_url || '/assets/img/placeholder.png'}
                                                    className={styles.productImg}
                                                    alt={val.name}
                                                    onError={(e) => {
                                                        e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.sku}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(val.price, currency)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {val.qty_ordered}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice((val.price * val.qty_ordered), currency)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            {detail[0].detail[0].subtotal && (
                                <TableRow>
                                    <TableCell colSpan={5} align="right" className={classNames(styles.noBorder, styles.summary)}>
                                        <Typography variant="span" letter="capitalize">
                                            {t('common:subtotal')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" className={classNames(styles.noBorder, styles.summary)}>

                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].subtotal, currency)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {detail[0].detail[0].payment && (
                                <TableRow>
                                    <TableCell colSpan={5} align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {t('order:shipping')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].payment.shipping_amount, currency)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {detail[0].detail[0].discount_amount ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {t('order:discount')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].discount_amount, currency)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {t('order:credit')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            {detail[0].detail[0].aw_giftcard.giftcard_amount ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {t('order:giftcard')}
                                            {' '}
                                            (
                                            { detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code }
                                            )
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" className={styles.noBorder}>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                            <TableRow>
                                <TableCell colSpan={5} align="right" className={styles.noBorder}>
                                    <Typography align="right" variant="title" size="14" type="bold" letter="capitalize">
                                        Grand Total
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" className={styles.noBorder}>
                                    <Typography variant="span" type="bold" letter="capitalize" size="14">
                                        {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Alert severity="warning">{t('order:notFound')}</Alert>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableListProduct;
