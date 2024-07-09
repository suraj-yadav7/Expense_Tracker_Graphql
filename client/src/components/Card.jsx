import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import {dateformat} from "../utilities/dateFormat.js"

const categoryColorMap = {
	saving: "from-green-600 to-green-400",
	expense: "from-pink-700 to-pink-600",
	investment: "from-blue-600 to-blue-400",
};

const Card = ({ transDetails,profilePic }) => {
	const {description,category,amount,date,location,paymentType,_id} = transDetails
	const cardClass = categoryColorMap[category];
	const navigate = useNavigate()
	const [deleteTrans, {loading}] = useMutation(DELETE_TRANSACTION,{
		refetchQueries:["getTransaction","getCategoryTransaction"]
	})
	const handleDelete=async()=>{
		try{
			let response=await deleteTrans({
				variables:{
					inputDeleteTransID:transDetails._id
				}
			})
			if(response.data){
				toast.success(`Transaction Deleted`)
			}
		}
		catch(error){
			console.log("Error occured in deleting: ", error)
		}
		}

	return (
		<div key={transDetails._id} className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						{!loading &&
							<FaTrash onClick={handleDelete} className={"cursor-pointer"} />
						}
						{loading && <div className="w-6 h-6 border-t-2 border-b-2 mx-1 rounded-full animate-spin"></div>}
						<HiPencilAlt onClick={()=>navigate(`/transaction/${transDetails._id}`)} className='cursor-pointer' size={20} />
						
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: Rs.{amount} /-
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{dateformat(date)}</p>
					<img
						src={profilePic? profilePic.profilePicture:"https://tecdn.b-cdn.net/img/new/avatars/5.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;