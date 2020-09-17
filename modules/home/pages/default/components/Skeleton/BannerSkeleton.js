import Skeleton from '@common_skeleton';
import useStyles from '../style';

const BannerSliderSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Skeleton
                variant="rect"
                animation="wave"
                xsStyle={{ width: '100%', height: '60vw' }}
                mdStyle={{ width: '100%', height: '577px' }}
            />
        </div>
    );
};

export default BannerSliderSkeleteon;
