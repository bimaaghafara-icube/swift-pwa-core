import { withTranslation } from '@i18n';
import Core from './core';
import Content from './components';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withTranslation()(Page);
