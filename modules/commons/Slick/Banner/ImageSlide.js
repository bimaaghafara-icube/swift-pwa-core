/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import { features } from '@config';
import setDefaultWhenEmpty from '@helpers/checkImageSrc';
import { breakPointsUp } from '@helpers/theme';
import classNames from 'classnames';
import useStyles from './style';
import Thumbor from './Thumbor';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height, mobileImageUrl = '', noLink,
    contentWidth, customClass = '',
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    const desktop = breakPointsUp('sm');
    const defaultWidth = desktop ? features.imageSize.homeSlider.desktop.width : features.imageSize.homeSlider.mobile.width;
    const defaultHeight = desktop ? features.imageSize.homeSlider.desktop.height : features.imageSize.homeSlider.mobile.height;
    const defaultImageUrl = typeof window !== 'undefined' && mobileImageUrl
        ? desktop ? setDefaultWhenEmpty(imageUrl) : setDefaultWhenEmpty(mobileImageUrl) : setDefaultWhenEmpty(imageUrl);
    if (noLink) {
        return (
            <Thumbor
                src={defaultImageUrl}
                alt={href}
                width={width || defaultWidth}
                height={height || defaultHeight}
                quality={100}
                className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider, customClass)
                    : classNames(styles.imageSlider, customClass)}
            />
        );
    }
    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a>
                <Thumbor
                    src={defaultImageUrl}
                    alt={href}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    quality={100}
                    className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider)
                        : styles.imageSlider}
                    contentWidth={contentWidth}
                    customClass={customClass}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
