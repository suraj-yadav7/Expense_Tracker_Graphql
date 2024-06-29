import { gql } from "@apollo/client";

export const GET_USER_AUTHENTICATION = gql`
query userAuthentication{
    authUser{
        _id
        username
    }
}
`
