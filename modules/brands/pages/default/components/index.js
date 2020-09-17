import { breakPointsUp } from '@helpers/theme';
import classNames from 'classnames';
import AllBrands from './all';
import useStyles from './style';
import Featured from './featured';

const Component = (props) => {
    const { t, featured } = props;
    const desktop = breakPointsUp('sm');
    const styles = useStyles();
    return (
        <div className={classNames('wrapper-brands', styles.wrapperBrands)}>
            <Featured t={t} featured={featured} desktop={desktop} />
            <AllBrands {...props} />
        </div>
    );
};

export default Component;
