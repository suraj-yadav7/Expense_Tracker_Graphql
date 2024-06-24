import React, { useState } from 'react'
import InputField from '../InputFields'
import {Link} from 'react-router-dom'


const Signup = () => {
const [signupData, setSignupData] = useState({
  fullname:'',
  username:'',
  password:'',
  gender:''
})

  const handleChange =(e)=>{
    const {name, value}=e.target
    setSignupData({...signupData, [name]:value})

  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    setSignupData({username:'', fullname:'', password:'', gender:''})

  }

console.log("signup: ", signupData)

  return (
    <>
      <div className="p-8 w-[20rem] bg-white  border border-red-300 rounded-xl ">
        <h3 className="text-xl font-bold text-center p-1 ">User Signup</h3>
        <p className="text-sm mb-2 text-center">Welcome! Create new account</p>
        <form onSubmit={handleSubmit}>
            <InputField name="fullname" className='my-4' label="Full Name" value={signupData.fullname}  onChange={handleChange} placeholder="Enter your full name"/>
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
        <p className="text-sm">Already have account? <Link to='/login'> <span className="text-red-400 underline cursor-pointer hover:text-red-300" >Login</span></Link></p>
      </div>
    </>
  )
}

export default Signup