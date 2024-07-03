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
    mutation transactionDelete($inputDeleteTransID:ID!){
        deleteTransaction(transactionId:$inputDeleteTransID){
            _id
            description
        }
    }
`
