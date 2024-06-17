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
}

type Query{
    transactions:[Transaction!]
    singleTransaction(transaction:ID!):Transaction
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
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String
}

`
export default transactionTypeDef;