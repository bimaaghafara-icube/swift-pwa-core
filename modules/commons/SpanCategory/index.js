import React from 'react';
import Typography from '@common_typography';
import Link from 'next/link';
import { useTranslation } from '@i18n';
import { features } from '@config';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import classNames from 'classnames';
import useStyles from './style';
import Thumbor from '../Image';

const SpanCategory = ({
    imageSrc, name, description, url, right = false,
}) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={classNames('row center middle-sm', right ? 'reverse' : '')}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <Link href="[...slug]" as={url}>
                        <a>
                            <Thumbor
                                src={setDefaultWhenEmpty(imageSrc)}
                                alt={name}
                                style={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                quality={80}
                                width={features.imageSize.category.width}
                                height={features.imageSize.category.height}
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className={styles.contentContainer}>
                        <Typography variant="title" type="bold" align="center">
                            {name}
                        </Typography>
                        <Typography size="12" align="center">
                            {/* eslint-disable-next-line react/no-danger */}
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Typography>
                        <Link href="[...slug]" as={url}>
                            <a>
                                <Typography variant="span" type="bold" className={styles.textBtn}>
                                    {t('common:button:shop')}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpanCategory;
