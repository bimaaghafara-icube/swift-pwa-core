import dayjs from 'dayjs';

const formatDate = (date = new Date(), format = 'MMMM D, YYYY') => dayjs(date).format(format);

export default formatDate;
