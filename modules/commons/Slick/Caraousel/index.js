/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './style';

const Caraousel = (props) => {
    const {
        data = [], xs = 767, sm = 1024, md = 1200,
        slideXs = 1, slideSm = 3, slideMd = 4, slideLg = 6,
        showArrow = true, Item, ...other
    } = props;

    const styles = useStyles();
    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);

    let sliderRef = React.createRef();

    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickGoTo(data.length - 1);
        } else {
            sliderRef.slickGoTo(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickGoTo(0);
        } else {
            sliderRef.slickGoTo(slideIndex + 1);
        }
    };

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slideLg,
        slidesToScroll: 1,
        initialSlide: 0,
        className: 'slider',
        centerMode: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        responsive: [
            {
                breakpoint: md,
                settings: {
                    slidesToShow: data.length < slideMd ? data.length : slideMd,
                    slidesToScroll: 1,
                    className: 'slider',
                    centerMode: false,
                },
            },
            {
                breakpoint: sm,
                settings: {
                    slidesToShow: data.length < slideSm ? data.length : slideSm,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider',
                },
            },
            {
                breakpoint: xs,
                settings: {
                    slidesToShow: data.length < slideXs ? data.length : slideXs,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider',
                },
            },
        ],
    };

    return (
        <div className={styles.caraousel}>
            <Slider ref={(slider) => sliderRef = slider} {...settings}>
                {
                    data && data.length > 0 && data.map((item, key) => (
                        <Item key={key} {...item} {...other} />
                    ))
                }
            </Slider>
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
        </div>
    );
};

export default Caraousel;
