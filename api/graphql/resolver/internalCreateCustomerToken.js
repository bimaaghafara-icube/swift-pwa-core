/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $password: String!,
        $phoneNumber: String!,
        $subscribe: Boolean,
        $otp: String!,
        $whatsapp_number: String,
    ) {
        createCustomerCustom(
            input: {
              firstname: $firstName,
              lastname: $lastName,
              email: $email,
              password: $password,
              phonenumber: $phoneNumber,
              is_subscribed: $subscribe,
              otp: $otp,
              whatsapp_number: $whatsapp_number,
            }
          ) {
            token
        }
    }
`;

const internalCreateCustomerToken = async (parent, args, context) => {
    const variables = {
        firstName: args.input.firstname,
        lastName: args.input.lastname,
        email: args.input.email,
        password: args.input.password,
        phoneNumber: args.input.phonenumber,
        subscribe: args.input.is_subscribe,
        otp: args.input.otp,
        whatsapp_number: args.input.whatsapp_number,
    };
    const res = await requestGraph(query, variables, context);
    // context.session.destroy();
    if (res.createCustomerCustom) {
        context.session.token = encrypt(res.createCustomerCustom.token);
        return {
            originalToken: res.createCustomerCustom.token,
            token: encrypt(res.createCustomerCustom.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalCreateCustomerToken;
