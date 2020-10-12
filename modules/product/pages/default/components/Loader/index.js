/* eslint-disable no-mixed-operators */
import Skeleton from '@common_skeleton';
import CarouselSkeleton from '@common_slick/Caraousel/Skeleton';
import useStyles from './style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <div className="column row">
            <div className="col-lg-1 hidden-mobile">
                <Skeleton
                    marginBottom={27}
                    variant="rect"
                    animation="wave"
                    mdStyle={{
                        width: '100%',
                        paddingBottom: '100%',
                        marginBottom: '10px',
                    }}
                    lgStyle={{
                        width: '100%',
                        paddingBottom: '100%',
                        marginBottom: '10px',
                    }}
                />
                <Skeleton
                    marginBottom={27}
                    variant="rect"
                    animation="wave"
                    mdStyle={{
                        width: '100%',
                        paddingBottom: '100%',
                        marginBottom: '10px',
                    }}
                    lgStyle={{
                        width: '100%',
                        paddingBottom: '100%',
                        marginBottom: '10px',
                    }}
                />
            </div>
            <div className="col-sm-12 col-xs-12 col-lg-5">
                <Skeleton
                    marginBottom={27}
                    variant="rect"
                    animation="wave"
                    xsStyle={{
                        width: '100%',
                        paddingBottom: '110%',
                    }}
                    mdStyle={{
                        width: '100%',
                        paddingBottom: '140%',
                    }}
                    lgStyle={{
                        width: '100%',
                        height: '100%',
                        paddingBottom: '140%',
                    }}
                />
            </div>
            <div className="col-sm-12 col-xs-12 col-lg-6">
                <div className={styles.container}>
                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={225}
                        height={53}
                        mdStyle={{
                            marginTop: '8px',
                        }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={225}
                        height={53}
                        mdStyle={{
                            marginTop: '-17px',
                        }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={225}
                        height={53}
                        mdStyle={{
                            marginTop: '-12px',
                        }}
                    />

                    <Skeleton
                        animation="wave"
                        variant="text"
                        width={75}
                        height={20}
                        mdStyle={{
                            marginTop: '3px',
                        }}
                    />
                    <div className="hidden-desktop">
                        <hr />
                        <Skeleton animation="wave" variant="text" width="100%" height={32} />
                        <hr />
                        <Skeleton animation="wave" variant="text" width="100%" height={32} />
                        <hr />
                    </div>
                    <div className="hidden-mobile">
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={25}
                            mdStyle={{
                                marginTop: '-1px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '20px',
                                marginTop: '7px',
                                marginLeft: '10px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginTop: '7px',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                marginTop: '7px',
                                display: 'inline-block',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={25}
                            mdStyle={{
                                marginTop: '12px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '20px',
                                marginTop: '7px',
                                marginLeft: '10px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginTop: '7px',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                marginTop: '7px',
                                display: 'inline-block',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={70}
                            height={20}
                            mdStyle={{
                                marginTop: '21px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={123}
                            height={50}
                            mdStyle={{
                                marginTop: '-9px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={316}
                            height={60}
                            mdStyle={{
                                marginTop: '-9px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={316}
                            height={15}
                            mdStyle={{
                                marginTop: '12px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                    </div>
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

export default SkeletonLoader;
