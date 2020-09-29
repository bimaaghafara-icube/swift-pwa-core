/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import { features } from '@config';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import classNames from 'classnames';
import { localResolver as queryResolver } from '@services/graphql/schema/local';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';
import useStyles from './style';
import Thumbor from '../Image';

const SpanCategory = (props) => {
    const {
        imageSrc, name, description, url, right = false, id,
    } = props;
    const client = useApolloClient();
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const handleClick = async () => {
        await client.writeQuery({
            query: queryResolver,
            data: {
                resolver: {
                    id,
                    type: 'CATEGORY',
                },
            },
        });
        Router.push(
            '/[...slug]',
            `/${url}`,
        );
    };
    return (
        <div className={styles.container}>
            <div className={classNames('row center middle-sm', right ? 'reverse' : '')}>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div>
                        <a onClick={handleClick}>
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
                    </div>
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
                        <div>
                            <a onClick={handleClick}>
                                <Typography variant="span" type="bold" className={styles.textBtn}>
                                    {t('common:button:shop')}
                                </Typography>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpanCategory;
