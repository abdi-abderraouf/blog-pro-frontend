import React, { useState } from 'react'
import '../../../src/input.css';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../Redux/apiCalls/authApiCall';
import { useDispatch } from 'react-redux';

const Register = () => {
  const  navigate=useNavigate();
  const dispatch = useDispatch();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  //Form Submit Handler 
  const submitHandler = (e) => {
      e.preventDefault();
      if(username.trim()==="") return toast.error("username is required");
      if(email.trim()==="") return toast.error("email is required");
      if(password.trim()==="") return toast.error("password is required");
      //console.log({username,email,password});
      dispatch(registerUser({username,email,password}))
      navigate("/login");
      
  };
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-6">
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
              <div className="mt-2">
                <input id="username"
                 name="username"
                 type="text" 
                 placeholder="    Enter your Username"
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
                 required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email"
                 name="email" type="email"
                  placeholder="   Enter your Email" 
                  value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"/>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
             </div>
              </div>
              <div className="mt-2">
                <input id="password" 
                name="password" 
                type="password" 
                placeholder="    Enter your password" 
                value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"/>
              </div>
            </div>
      
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
            </div>
          </form>
      
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account ? <Link to="/Login" > Login </Link>
          </p>
        </div>
      </div>
    )
}

export default Register;
