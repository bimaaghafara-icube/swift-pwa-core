import { formatPrice } from '@helpers/currency';
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';

const CashbackInfo = ({
    message, price, currency = 'IDR', promo_name,
}) => (
    <div className="m-15">
        <Alert saverity="success">
            { message[0] }
            <Typography type="bold">
                {formatPrice(price,
                    currency)}
            </Typography>
            {message[1]}
            <Typography type="bold">
                {promo_name}
            </Typography>
            { message[2]}
        </Alert>
    </div>
);

export default CashbackInfo;
