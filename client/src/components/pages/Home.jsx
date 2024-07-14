import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdLogout } from "react-icons/md";
import TransactionForm from "../TransactionForm";
import Card from "../Card";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import Cards from "../Cards";
import { GET_TRANSACTION_BY_CATEGORY } from "../../graphql/queries/transaction.query";
import {GET_USER_AND_TRANSACTION, GET_USER_AUTHENTICATION} from "../../graphql/queries/user.query"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {

	const {data}=useQuery(GET_TRANSACTION_BY_CATEGORY)
	const {data:authData}=useQuery(GET_USER_AUTHENTICATION)
	const [logoutUser, {loading,client}] =useMutation(LOGOUT,{
		refetchQueries:["userAuthentication"]
	})

	const [chartData, setChartData] =useState({
		labels: [],
		datasets: [
			{
				label: "%",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 6,
				borderRadius: 30,
				spacing: 6,
				cutout: 124,
			},
		],
	});

	const handleLogout = async() => {
		try{
			await logoutUser()
			client.resetStore()
		}
		catch(error){
			console.log("Error in logout client: ", error)
		}
	};
	
	useEffect(()=>{
		if(data?.categoryTransaction){
			let categories = data?.categoryTransaction.map((trans)=> trans.category)
			let totalAmount = data?.categoryTransaction.map((trans)=> trans.totalAmount)
		let bgColor=[]
		let brColor=[]
		categories.forEach((cateElement)=>{
			if(cateElement==="saving"){
				bgColor.push("rgba(75, 192, 192)")
				brColor.push("rgba(75, 192, 192)")
			}
			else if(cateElement === "investment"){
				bgColor.push("rgba(54, 162, 235)")
				brColor.push("rgba(54, 162, 235)")
			}
			else if(cateElement === "expense"){
				bgColor.push("rgba(255, 99, 132)")
				brColor.push("rgba(255, 99, 132)")
			}
		})

		setChartData((prev)=> ({
			labels:categories,
			datasets:[
				{
					...prev.datasets[0], 
					data:totalAmount,
					backgroundColor:bgColor,
					borderColor:brColor
				}
			]
		}))

		}
	},[data]);

	return (
		<>
			<div className='flex flex-col gap-6 items-center  mx-auto z-20 relative justify-center pt-4 phone:gap-2'>
				<div>
					<Link to="/">
					<h3 className="md:text-4xl  lg:text-5xl font-bold text-center relative z-50  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text phone:text-3xl ">Expense Tracker</h3>
					</Link>
				</div>
				<div className='flex items-center'>
					<p className='text-2xl font-bold mr-4 phone:text-xl phone:font-semibold'>
						Spend wisely, Track nicely
					</p>
					<img
						src={authData?.authUser.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer mr-2 phone:w-8 phone:h-8'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex w-full justify-center items-center gap-6 phone:flex-col'>
					{data?.categoryTransaction.length>0?
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>:null
					}
					<TransactionForm/>
				</div>
				<Cards profileData={authData?.authUser}/>
			</div>
		</>
	);
};
export default HomePage;