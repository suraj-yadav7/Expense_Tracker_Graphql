import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
import { GET_SINGLE_TRANSACTION } from '../../graphql/queries/transaction.query';
import { UPDATE_TRANSACTION } from '../../graphql/mutations/transaction.mutation';
import toast from 'react-hot-toast';

const Transaction = () => {
	const {id}=useParams()
	const navigate=useNavigate()
	const {data, loading} = useQuery(GET_SINGLE_TRANSACTION,{
		variables:{
			transactionID:id
		}
	})
	
const [formData, setFormData] = useState({
    	description:data?.singleTransaction?.description || "",
		paymentType:data?.singleTransaction?.paymentType || "",
		category:data?.singleTransaction?.category || "",
		amount:data?.singleTransaction?.amount || "",
		location:data?.singleTransaction?.location || "",
		date:data?.singleTransaction?.date || "",
})
//   Here loading variable is changed to updateLoading
const [updateTrans,{loading:updateLoading}]=useMutation(UPDATE_TRANSACTION,{
	refetchQueries:["getTransaction","getCategoryTransaction"]
})
const handleInputChange = (e)=>{
    const {name, value} = e.target
    setFormData((prev)=>({
    ...prev, [name]:value
    }))
}

const handleSubmit=async(e)=>{
    e.preventDefault()
	let amount = parseFloat(formData.amount)
	try{
		let response =await updateTrans({
			variables:{
				inputUpdateTrans:{
					...formData,
					_id:id,
					amount
				}
			}
		})
		if(response.data){
			toast.success("transaction is updated")

		}
	}
	catch(error){
		console.log("Error occured at updating transaction details: ", error)
	}
  };

  useEffect(()=>{
	if(data){
		setFormData({
			description:data.singleTransaction.description,
			paymentType:data.singleTransaction.paymentType,
			category:data.singleTransaction.category,
			amount:data.singleTransaction.amount,
			location:data.singleTransaction.location,
			date: new Date(+data.singleTransaction.date).toISOString().substr(0, 10)
		})
	}
  },[data])
  return (
    <>
		<div className='h-screen flex flex-col justify-center items-center pb-36'>
				<div>
					<Link to="/">
					<h3 className="md:text-4xl text-2xl lg:text-5xl font-bold text-center relative z-50  bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">Expense Tracker</h3>
					</Link>
				</div>
				<div className='flex items-center mb-8 '>
					<p className='text-2xl font-bold mr-4'>
						Spend wisely, Track nicely
					</p>
				</div>
			<span className='relative right-52 font-semibold  bg-pink-400 px-8 hover:text-white hover:cursor-pointer ' onClick={()=>navigate("/")}>Back</span>
        <div className='p-4 max-w-4xl mx-auto flex flex-col items-center border border-red-300 rounded-lg'>
			<p className='md:text-4xl text-2xl lg:text-3xl font-bold text-center relative z-50  mr-4 bg-gradient-to-r from-red-400 via-pink-400 to-yellow-500 inline-block text-transparent bg-clip-text'>
				Update This Transaction
			</p>
			<form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
				{/* TRANSACTION */}
				<div className='flex flex-wrap mt-5'>
					<div className='w-full'>
						<label
							className='block uppercase tracking-wide  text-xs font-bold mb-1'
							htmlFor='description'
						>
							Transaction
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='description'
							name='description'
							type='text'
							placeholder='Rent, Groceries, Salary, etc.'
							value={formData.description }
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* PAYMENT TYPE */}
				<div className='flex flex-wrap gap-3 pt-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide  text-xs font-bold mb-1'
							htmlFor='paymentType'
						>
							Payment Type
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='paymentType'
								name='paymentType'
								onChange={handleInputChange}
								value={formData.paymentType}
								defaultValue="card"
							>
								<option value={"card"}>Card</option>
								<option value={"cash"}>Cash</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* CATEGORY */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-xs font-bold mb-1'
							htmlFor='category'
						>
							Category
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='category'
								name='category'
								onChange={handleInputChange}
								value={formData.category}
								defaultValue="saving"
							>
								<option value={"saving"}>Saving</option>
								<option value={"expense"}>Expense</option>
								<option value={"investment"}>Investment</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* AMOUNT */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase  text-xs font-bold mb-1' htmlFor='amount'>
							Amount(₹)
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='amount'
							name='amount'
							type='number'
							placeholder='Rs.150'
							value={formData.amount}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* LOCATION */}
				<div className='flex flex-wrap gap-3 pt-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide  text-xs font-bold mb-1'
							htmlFor='location'
						>
							Location
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							id='location'
							name='location'
							type='text'
							placeholder='Hyderabad'
							value={formData.location}
							onChange={handleInputChange}
						/>
					</div>

					{/* DATE */}
					<div className='w-full flex-1'>
						<label
							className='block uppercase tracking-wide  text-xs font-bold mb-1'
							htmlFor='date'
						>
							Date
						</label>
						<input
							type='date'
							name='date'
							id='date'
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						focus:bg-white'
							placeholder='Select date'
							value={formData.date}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* SUBMIT BUTTON */}
				<button
					className='text-white text-lg font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
					type='submit'
				>
					Update Transaction
				</button>
			</form>
		</div>
		</div>
        </>
  )
};

export default Transaction;