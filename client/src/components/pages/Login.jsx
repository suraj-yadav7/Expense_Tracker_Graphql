import React, { useState } from "react"
import InputField from "../InputFields";
import {Link, useNavigate} from 'react-router-dom'
import { LOGIN } from "../../graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const Login = ()=>{
    const [loginData, setLoginData] = useState({username:'', password:''})

    const [loginUser, {loading, error}]=useMutation(LOGIN,{
        refetchQueries:["userAuthentication"]
      })
    const navigate = useNavigate()

    const verifyUser = async()=>{
        if(!loginData.username || !loginData.password) return toast.error("All fields required")
        try{
            let {data} = await loginUser({
                variables:{
                    loginInputData:loginData
                }
            })
            if(data.login){
                toast.success("User Found")
                setLoginData({username:"", password:""})
                setTimeout(()=>{
                    navigate("/")
                },1500)
            }
        }
        catch(error){
            console.log("client side error at login user: ", error)
            toast.error(error.message)
        }
    };

    const handleChange =(e)=>{
        const {value,name} = e.target
        setLoginData((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        verifyUser()
    };
    return (
        <>
            <div className="p-8 bg-white  border border-red-300 rounded-xl">
                <h3 className="text-xl font-bold text-center p-1 ">User Login</h3>
                <p className="text-sm mb-2">Welcome back! Login to your account</p>
                <form onSubmit={handleSubmit}>
                    <InputField name="username" className='my-4' label="Username" value={loginData.username}  onChange={handleChange} placeholder="Enter your username"/>
                    <InputField type="password" name="password" className="my-2" label="Password" value={loginData.password} onChange={handleChange} placeholder="Enter your password"/>
                    <button type="submit" className="px-2 py-1 m-1 my-2 text-md bg-slate-600 text-white border rounded-md hover:bg-slate-400">Login</button>
                </form>
                <p className="text-sm">Don't have account? <Link to="/signup"><span className="text-red-400 underline cursor-pointer hover:text-red-300">SignUp</span></Link></p>
            </div>
        </>
    )
};

export default Login;