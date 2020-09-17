import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import Link from 'next/link';
import useStyles from './style';
import ConfirmationDelete from '../../confirmDelete';

const TableListProduct = ({
    data, t, deleteItem, handleFeed, toggleEditDrawer,
}) => {
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);
    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.prices,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    const handleAddWishlist = (item) => {
        handleFeed(item);
    };

    const openEdit = (item) => {
        toggleEditDrawer({
            id: item.id,
            quantity: item.quantity,
            product_name: item.product.name,
        });
    };

    return (
        <>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={cancelDelete}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={2}>
                                <Typography variant="span" type="bold">
                                    Item
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
                            {/* <TableCell align="center">
                                <Typography variant="span" type="bold">
                                    {t('common:title:action')}
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            <>
                                {
                                    data.map((val, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow className={styles.tableRowResponsive} key={index}>
                                                <TableCell
                                                    align="center"
                                                    rowSpan={2}
                                                >
                                                    <div className={styles.productImgContainer}>
                                                        <Link
                                                            href="/[...slug]"
                                                            as={`/${val.product.url_key}`}
                                                        >
                                                            <a>
                                                                <img
                                                                    src={val.product.small_image.url || '/assets/img/placeholder.png'}
                                                                    className={styles.productImg}
                                                                    alt={val.product.name}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                                                                    }}
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={styles.noBorder}
                                                >
                                                    <Link
                                                        href="/[...slug]"
                                                        as={`/${val.product.url_key}`}
                                                    >
                                                        <a>
                                                            <Typography variant="span" letter="capitalize">
                                                                {val.product.name}
                                                            </Typography>
                                                        </a>
                                                    </Link>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice(val.prices.price.value, val.prices.price.currency)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {val.quantity}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={styles.noBorder}
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice((val.prices.price.value * val.quantity), val.prices.price.currency)}
                                                    </Typography>
                                                </TableCell>
                                                {/* <TableCell
                                                align="center"
                                            >
                                                <div className="row center-xs" style={{ maxWidth: 100 }}>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton
                                                            className={styles.iconBtn}
                                                            onClick={() => openEdit(val)}
                                                        >
                                                            <CreateOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                            <FavoriteBorderOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                    <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                        <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                            <DeleteOutlineOutlined className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </TableCell> */}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} />
                                                <TableCell
                                                    align="right"
                                                >
                                                    <div>
                                                        <IconButton
                                                            className={styles.iconBtn}
                                                            onClick={() => openEdit(val)}
                                                        >
                                                            <CreateOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                        <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                            <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                        <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                            <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                }
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
        </>
    );
};

export default TableListProduct;
