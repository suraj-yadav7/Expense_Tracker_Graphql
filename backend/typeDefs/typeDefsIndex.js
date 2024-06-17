import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typedefs.js";
import transactionTypeDef from "./transaction.typedefs.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef])

export default mergedTypeDefs;