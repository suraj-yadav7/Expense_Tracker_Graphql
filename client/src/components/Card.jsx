import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";


const categoryColorMap = {
	saving: "from-green-600 to-green-400",
	expense: "from-pink-700 to-pink-600",
	investment: "from-blue-600 to-blue-400",
};

const Card = ({ transDetails }) => {
	console.log('detials:L ', transDetails)
	const {description,category,amount,date,location,paymentType,_id} = transDetails

	const cardClass = categoryColorMap[category];

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} />
						<Link to={`/transaction/123`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
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
					<p className='text-xs text-black font-bold'>{date}</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/5.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;