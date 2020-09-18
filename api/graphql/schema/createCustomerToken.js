const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const { gql } = require('apollo-server-express');

const customerSchema = makeExecutableSchema({
    typeDefs: gql`
        type Token {
            originalToken: String
            token: String
            message: String
        }

        type Query {
            getCustomerToken: Token
        }

        type RevokeCustomerTokenOutput {
            result: Boolean
        }

        input internalCreateCustomerTokenInput {
            firstname: String
            lastname: String
            email: String
            password: String
            phonenumber: String
            is_subscribed: Boolean
            otp: String
            whatsapp_number: String
        }

        type internalGenerateSessionOutput {
            result: Boolean
            isLogin: Boolean
            cartId: String
        }

        type internalDeleteSessionOutput {
            result: Boolean
        }

        type Mutation {
            internalGenerateCustomerToken(username: String!, password: String!): Token
            internalCreateCustomerToken(input: internalCreateCustomerTokenInput): Token
            internalGenerateCustomerTokenOtp(username: String!, otp: String!): Token
            internalDeleteCustomerToken: RevokeCustomerTokenOutput
            internalGenerateSession(state: String!): internalGenerateSessionOutput
            internalDeleteSession: internalDeleteSessionOutput
        }
    `,
});

addMockFunctionsToSchema({ schema: customerSchema });

module.exports = customerSchema;
