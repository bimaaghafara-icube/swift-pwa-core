import { useMutation } from '@apollo/client';
import * as Schema from './schema';

export const confirmPayment = () => useMutation(Schema.confirmPayment, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export default {
    confirmPayment,
};
