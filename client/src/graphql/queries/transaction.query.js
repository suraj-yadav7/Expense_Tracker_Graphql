import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
    query getTransaction{
        transaction{
            _id
            description
            paymentType
            paymentType
            category
            amount
            location
            date
        }
    }
`