import { gql } from "@apollo/client";

export const CREATE_TRANSACTION=gql`
    mutation transactionCreation($inputTrans:createInputTransaction!){
        createTransaction(input:$inputTrans){
            _id
            description
            amount
        }
    }
`
export const UPDATE_TRANSACTION=gql`
    mutation transactionUpdate($inputUpdateTrans:updateInputTransaction!){
        updateTransaction(input: $inputUpdateTrans){
            _id
            description
            amount
            category
        }
    }
`

export const DELETE_TRANSACTION=gql`
    mutation transactionDelete($inputDeleteTrans:ID!){
        deleteTransaction(transactionId:$inputDeleteTrans){
            _id
            description
        }
    }
`
