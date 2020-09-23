/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import Slider from 'react-slick';
import ImageSlide from '../Banner/ImageSlide';
import useStyles from './style';
import Thumbor from '../Banner/Thumbor';

const Banner = ({
    data = [],
    height,
    width,
    contentWidth = '',
    autoPlay = true,
    noLink = false,
    thumbnail = false,
    showArrow = true,
    speed = 500,
    autoplaySpeed = 4000,
    actionImage = () => {},
}) => {
    const styles = useStyles();
    const [slideIndex, setIndex] = useState(data.length - 1);
    const [count, setCount] = useState(0);
    let sliderRef = React.createRef();
    const dotActive = data.length > 1
        ? classNames(styles.dotsItem, styles.dotActive)
        : styles.hide;
    const dotItem = data.length > 1 ? styles.dotsItem : styles.hide;
    const handleLeftArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickGoTo(0);
        } else {
            sliderRef.slickGoTo(slideIndex + 1);
        }
    };
    const handleRightArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickGoTo(data.length - 1);
        } else {
            sliderRef.slickGoTo(slideIndex - 1);
        }
    };
    const settings = {
        // className: thumbnail ? 'slick-thumbnail' : 'slick-pwa',
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        speed,
        autoplaySpeed,
        rtl: true,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
    };

    return (
        <div className={styles.container}>
            {thumbnail ? (
                <div>
                    {data.map((item, id) => (
                        <div
                            className={slideIndex === data.length - (id + 1)
                                ? classNames(styles.thumbnail, styles.thumbnailActive, 'hidden-mobile')
                                : classNames(styles.thumbnail, 'hidden-mobile')}
                            key={id}
                            onClick={() => {
                                sliderRef.slickGoTo(data.length - (id + 1));
                            }}
                        >
                            <Thumbor
                                src={item.imageUrl}
                                alt="thumbnail"
                                width={100}
                                height={100}
                                quality={100}
                                className={styles.thumbnailImg}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className={classNames(styles.caraousel)}>
                <Slider ref={(slider) => sliderRef = slider} {...settings}>
                    {data.map((item, key) => (
                        <div onClick={actionImage}>
                            <ImageSlide
                                height={height}
                                customClass={styles.customClass}
                                width={width}
                                noLink={noLink}
                                key={key}
                                {...item}
                            />
                        </div>
                    ))}
                </Slider>
                {
                    showArrow ? (
                        <>
                            <div
                                className={thumbnail
                                    ? classNames(styles.arrow, styles.leftArrow, styles.leftArrowThumbnail)
                                    : classNames(styles.arrow, styles.leftArrow)}
                                onClick={handleLeftArrow}
                            >
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
                            className={slideIndex === id ? dotActive : dotItem}
                            key={id}
                            onClick={() => {
                                sliderRef.slickGoTo(data.length - (id + 1));
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Banner;
