import React, { useState } from 'react'
import InputField from '../InputFields'
import {Link, useNavigate} from 'react-router-dom'
import { SIGN_UP } from '../../graphql/mutations/user.mutation'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

const Signup = () => {
const [signupData, setSignupData] = useState({
  name:'',
  username:'',
  password:'',
  gender:''
})

const [SignUp,{loading,error}] = useMutation(SIGN_UP,{
  refetchQueries:["userAuthentication"]
})
const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name, value}=e.target
    setSignupData({...signupData, [name]:value})

  }

const handleSubmit =async(e)=>{
    e.preventDefault()
    const requiredField=["name","username", "password","gender"];
    try{
      let response =await SignUp({
        variables:{
          inputData:signupData
        }
      }) 
      if(response){
        toast.success("User Created")
        setSignupData({username:'', name:'', password:'', gender:''})
      }
      setTimeout(()=>{
        navigate("/")
      },1500)
    }
    catch(error){
      console.log("Client side error at auth: ",error)
      toast.error(error.message)
    }
  };


  return (
    <>
      <div className="h-screen flex justify-center items-center pb-16 phone:pb-4">
      <div className="p-8 w-[26rem] phone:w-[20rem] bg-white  border border-red-300 rounded-xl phone:border-red-500">
        <h3 className="text-2xl font-bold text-center p-1 phone:text-xl">User Signup</h3>
        <p className="text-lg mb-2 text-center phone:text-base">Welcome! Create new account</p>
        <form onSubmit={handleSubmit} className='text-lg phone:text-base'>
            <InputField name="name" className='my-4' label="Full Name" value={signupData.name}  onChange={handleChange} placeholder="Enter your full name"/>
            <InputField name="username" className='my-4' label="Username" value={signupData.username}  onChange={handleChange} placeholder="Enter your username"/>
            <InputField type="password" name="password" className="my-2" label="Password" value={signupData.password} onChange={handleChange} placeholder="Enter your password"/>
            <div className='my-3'>
              <p className='text-md font-medium text-gray-700'>Gender</p>
              <label className='py-3 mr-4'>Male
                <input className='mx-2 pt-1' type='radio' name='gender' value='male' onChange={handleChange} checked={signupData.gender==='male'}/>
              </label>
                <label className='py-2'>Female
                <input className='mx-2 pt-1' type ='radio' name="gender" value='female' onChange={handleChange} checked={signupData.gender ==="female"}/> 
                </label>
            </div>
            <button type="submit" className="px-2 py-1 m-1 my-2 text-md bg-slate-600 text-white border rounded-md hover:bg-slate-400">Signup</button>
        </form>
        <p className="text-base phone:text-sm">Already have account? <Link to='/login'> <span className="text-red-400 underline cursor-pointer hover:text-red-300" >Login</span></Link></p>
      </div>
      </div>
    </>
  )
}

export default Signup