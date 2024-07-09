import { gql } from "@apollo/client";

export const GET_USER_AUTHENTICATION = gql`
query userAuthentication{
    authUser{
        _id
        username
        gender
        profilePicture
    }
}
`

export const GET_USER_AND_TRANSACTION=gql`
query getUserAndTransaction($userid: ID!){
    user(userId: $userid){
        _id
        username
        gender
        transactions{
            _id
            description
            amount
            date
        }
    }
}
`