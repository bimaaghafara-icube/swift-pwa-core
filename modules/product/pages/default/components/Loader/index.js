/* eslint-disable no-mixed-operators */
import Skeleton from '@common_skeleton';
import CarouselSkeleton from '@common_slick/Caraousel/Skeleton';
import { features } from '@config';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className="column row">
            <div className="col-sm-12 col-xs-12 col-lg-8">
                <Skeleton
                    marginBottom={27}
                    variant="rect"
                    animation="wave"
                    xsStyle={{
                        width: '100%',
                        height: `${Math.floor(features.imageSize.homeSlider.height / features.imageSize.homeSlider.width * 100)}vw`,
                    }}
                    mdStyle={{
                        width: '100%',
                        height: `${Math.floor(features.imageSize.homeSlider.height / features.imageSize.homeSlider.width * 960)}px`,
                    }}
                    lgStyle={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <div className="col-sm-12 col-xs-12 col-lg-4">
                <div className={styles.container}>
                    <Skeleton animation="wave" variant="text" width={225} height={32} />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <Skeleton animation="wave" variant="text" width={175} height={32} />
                </div>
                <div className={styles.container}>
                    <hr />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <hr />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <hr />
                </div>
                <div className={styles.container}>
                    <hr />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <Skeleton animation="wave" variant="text" width={100} height={32} />
                    <br />
                    <Skeleton animation="wave" variant="text" width="30%" height={32} />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <Skeleton animation="wave" variant="text" width="80%" height={32} />
                    <hr />
                    <Skeleton animation="wave" variant="text" width="30%" height={32} />
                    <Skeleton animation="wave" variant="text" width="100%" height={32} />
                    <Skeleton animation="wave" variant="text" width="80%" height={32} />
                    <hr />
                </div>
            </div>
            <div
                className="hidden-mobile"
                style={{
                    width: '100%',
                    height: 340,
                }}
            >
                <Skeleton animation="wave" variant="text" width="100%" height={340} />
            </div>
            <CarouselSkeleton />
        </div>
    );
};
