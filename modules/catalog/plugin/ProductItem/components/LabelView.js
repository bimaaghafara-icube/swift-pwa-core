import Label from '@common_label';
import { modules } from '@config';
import useStyles from '../style';

const LabelView = (props) => {
    const {
        __typename, new_from_date, new_to_date, sale,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.badgesNewSales}>
            <Label
                productType={__typename}
                newFromDate={new_from_date}
                newToDate={new_to_date}
                sale={sale}
                config={modules.catalog.productListing.label}
            />
        </div>
    );
};

export default LabelView;
