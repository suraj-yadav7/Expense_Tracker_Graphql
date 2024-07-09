import Card from "./Card";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";

const Cards = ({profileData}) => {
	const {loading, data} =useQuery(GET_TRANSACTION)
	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10 mt-2'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map((elem)=>(
					<Card key={elem._id} transDetails={elem} profilePic={profileData} />
				))}
			</div>
			{
				!loading && data?.transactions?.length===0 &&(<div className="text-center font-semibold"><p>No Transaction Found</p></div>
				)}
		</div>
	);
};
export default Cards;