import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
    query getTransaction{
        transactions{
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