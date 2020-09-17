import Core from './core';
import DesktopView from './components/DesktopSummary';
import MobileView from './components/BottomSummary';

const DefaultSummary = (props) => (
    <Core
        DesktopView={DesktopView}
        MobileView={MobileView}
        {...props}
    />
);

export default DefaultSummary;
