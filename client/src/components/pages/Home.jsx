import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdLogout } from "react-icons/md";
import TransactionForm from "../TransactionForm";
import Card from "../Card";


ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const chartData = {
		labels: ["Saving", "Expense", "Investment"],
		datasets: [
			{
				label: "%",
				data: [13, 8, 3],
				backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
				borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
				borderWidth: 6,
				borderRadius: 30,
				spacing: 6,
				cutout: 124,
			},
		],
	};

	const handleLogout = () => {
		console.log("Logging out...");
	};

	const loading = false;

	return (
		<>
			<div className='flex flex-col gap-6 items-center  mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track nicely
					</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>
					  <TransactionForm/>
				</div>
				<Card cardType={'saving'}/>
			</div>
		</>
	);
};
export default HomePage;