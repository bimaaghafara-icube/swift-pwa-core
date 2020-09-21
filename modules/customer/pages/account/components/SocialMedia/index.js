/* eslint-disable react/no-danger */
import {
    cmsSocialMediaLinkIdentifiers,
} from '@config';
import { getCmsBlocks } from '../../../../services/graphql';

const SocialMediaLink = (props) => {
    const { SocialMediaView } = props;
    const { error, data } = getCmsBlocks({ identifiers: [cmsSocialMediaLinkIdentifiers] });
    if (error) return <div>{`Error: ${JSON.stringify(error)}`}</div>;

    return <SocialMediaView data={data} />;
};

export default SocialMediaLink;
