import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import useStyles from '../style';

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={20} animation="wave" />
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="90%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '400px' }}
                    animation="wave"
                />
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={10} animation="wave" />
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="90%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '400px' }}
                    animation="wave"
                />
            </Grid>
        </div>
    );
};

export default CategoryListSkeleteon;
