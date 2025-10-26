import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { motion, } from 'framer-motion'
import { validateEmail } from '../../utils/helper'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    //Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return;
        }
        if (!password) {
            setError("Please enter the password")
            return;
        }
        setError("")

    }

    return (
        <Authlayout>
            <div className="lg:w-full h-3/4  md:h-full flex flex-col justify-center">
                <h3 className='text-xl ms-5 font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs ms-5 mb-7 text-slate-700 mt-[5px]'>Please enter details to Sign In</p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder='nemash@example.com'
                        label='Email Address'
                        type='text'
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder='Min 6 Characters'
                        label='Password'
                        type='password'
                    />
                    {error && <p className='text-red-500 text-xs pb-2.5 ms-5'>{error}</p>}
                    <motion.button
                        animate={{ x: [0, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={"px-6 py-2 ms-5 w-full bg-blue-800 shadow-2xl text-white rounded-2xl border font-medium transition-all duration-300 border-gray-600 hover:border-blue-500 hover:text-white"}>
                        Sign In
                    </motion.button>
                    <p className='text-[13px] text-slate-800 mt-3 ms-5 mb-6'>
                        Don't have an account?{""}
                        <Link className='font-medium text-primary underline' to="/signup">SignUp</Link>
                    </p>
                </form>
            </div>
        </Authlayout>
    )
}

export default Login