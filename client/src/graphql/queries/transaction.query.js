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

export const GET_SINGLE_TRANSACTION=gql`
    query getSingleTransaction($transactionID:ID!){
        singleTransaction(transactionId:$transactionID){
            _id
            userID
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`