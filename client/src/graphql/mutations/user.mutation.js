import { gql } from "@apollo/client";

export const SIGN_UP=gql`
        mutation SignUp($inputData: signUpInput!){
                signUp(input: $inputData){
                    _id
                    name
                    username
                }
            }
`


export const LOGIN=gql`
    mutation user_login($loginInputData: loginInput!){
        login(input:$loginInputData){
            _id
            username
            gender
        }
    }
`