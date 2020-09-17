import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '../style';

const data = [1, 2, 3];

export const SkeletonContent = () => {
    const styles = useStyles();
    return (
        <>
            <div className="hidden-desktop">
                {
                    data.map((i) => (
                        <div key={i} className={styles.itemContainer}>
                            <div className={styles.contentItem}>
                                <Skeleton variant="text" width={70} height={15} animation="wave" />
                                <Skeleton variant="text" width={120} height={20} animation="wave" />
                                <div className={styles.detailItem}>
                                    <div className={`column ${styles.columnLabel}`}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                    <div className={styles.detailContent}>
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="hidden-mobile">
                {
                    data.map((i) => (
                        <Skeleton key={i} variant="text" width="100%" height={30} animation="wave" />
                    ))
                }
                {
                    data.map((i) => (
                        <Skeleton key={i} variant="text" width="100%" height={30} animation="wave" />
                    ))
                }
            </div>
        </>
    );
};

export default () => {
    const styles = useStyles();
    return (
        <>
            <div className="row hidden-mobile">
                <div className="col-md-10">
                    <div className={styles.container}>
                        {data.map((i) => (
                            <div key={i} className={styles.itemContainer}>
                                <div className={styles.contentItem}>
                                    <Skeleton variant="text" width={70} height={15} animation="wave" />
                                    <Skeleton variant="text" width={120} height={20} animation="wave" />
                                    <div className={styles.detailItem}>
                                        <div className={`column ${styles.columnLabel}`}>
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        </div>
                                        <div className={styles.detailContent}>
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                            <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={classNames(styles.container, 'hidden-desktop')}>
                <SkeletonContent />
            </div>
        </>
    );
};
