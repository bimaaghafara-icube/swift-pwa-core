/* eslint-disable no-nested-ternary */
import React from 'react';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import DefaultContent from './components';
import CoreBase from './core';
import Skeleton from './components/Skeleton';
import WarningInfo from '../../components/Info';
import ContentCategory from '../../components/ModalCategory';
import ContentItem from '../../components/Details';

const Page = (props) => (
    <CoreBase
        Content={DefaultContent}
        ContentCategory={ContentCategory}
        ContentItem={ContentItem}
        Skeleton={Skeleton}
        WarningInfo={WarningInfo}
        {...props}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['blog'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
