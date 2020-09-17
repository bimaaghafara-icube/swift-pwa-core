/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import { autoPlay as swipeAuto } from 'react-swipeable-views-utils';
import dynamic from 'next/dynamic';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import ImageSlide from './ImageSlide';
import useStyles from './style';

const SwipeableViews = dynamic(() => import('react-swipeable-views'));

const AutoPlaySwipeableViews = swipeAuto(SwipeableViews);

const Banner = ({
    data = [],
    height,
    width,
    contentWidth = '',
    autoPlay = true,
    noLink = false,
    showArrow = false,
}) => {
    const styles = useStyles();
    const [index, setIndex] = useState(0);

    const dotActive = data.length > 1
        ? classNames(styles.dotsItem, styles.dotActive)
        : styles.hide;
    const dotItem = data.length > 1 ? styles.dotsItem : styles.hide;
    const handleLeftArrow = () => {
        if (index === 0) {
            setIndex(data.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const handleRightArrow = () => {
        if (index === data.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    return (
        <div className={styles.caraousel}>
            <AutoPlaySwipeableViews
                index={index}
                onChangeIndex={(i) => setIndex(i)}
                enableMouseEvents
                autoplay={autoPlay}
            >
                {data.map((item, key) => (
                    <ImageSlide
                        height={height}
                        width={width}
                        noLink={noLink}
                        contentWidth={contentWidth}
                        key={key}
                        {...item}
                    />
                ))}
            </AutoPlaySwipeableViews>
            {
                showArrow ? (
                    <>
                        <div className={classNames(styles.arrow, styles.leftArrow)} onClick={handleLeftArrow}>
                            <LeftArrowIcon fontSize="inherit" />
                        </div>
                        <div className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
                            <RightArrowIcon fontSize="inherit" />
                        </div>
                    </>
                ) : null
            }
            <div className={styles.dots}>
                {data.map((item, id) => (
                    /* eslint-disable jsx-a11y/click-events-have-key-events */
                    /* eslint-disable jsx-a11y/no-static-element-interactions */
                    <div
                        className={index === id ? dotActive : dotItem}
                        key={id}
                        onClick={() => setIndex(id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
