const transactionTypeDef=`#graphql

type Transaction{
    _id:ID!
    userID:ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
    # relationship to get user details
    user:User!
}

type Query{
    transactions:[Transaction!]
    singleTransaction(transactionId:ID!):Transaction
    categoryTransaction:[CategoryTrans] 
}
type CategoryTrans{
    category:String!
    totalAmount:Float!
}

type Mutation{
    createTransaction(input: createInputTransaction!):Transaction!
    updateTransaction(input:updateInputTransaction!):Transaction!
    deleteTransaction(transactionId:ID!):Transaction!
}


input createInputTransaction{
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}

input updateInputTransaction{
    _id:String
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String
}

`
export default transactionTypeDef;