import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { motion, } from 'framer-motion'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const Signup = () => {

    const [profilepic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const Navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter your name")
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return;
        }
        if (!password) {
            setError("Please enter the password")
            return;
        }

        setError("");
    }

    return (
        <Authlayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Input
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                                label="Full Name"
                                placeholder="Nemash"
                                type="text"
                            />
                        </div>
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
                    </div>
                    {error && <p className='text-red-500 text-xs pb-2.5 ms-5'>{error}</p>}
                    <motion.button
                        animate={{ x: [0, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={"px-6 py-2 ms-5 w-full h-12 bg-blue-800 shadow-2xl text-white rounded-2xl border font-medium transition-all duration-300 border-gray-600 hover:border-blue-500 hover:text-white"}>
                        Sign up
                    </motion.button>
                    <p className='text-[13px] text-slate-800 mt-3 ms-5 mb-6'>
                        Already have an account?{""}
                        <Link className='font-medium text-primary underline' to="/login">SignIn</Link>
                    </p>
                </form>
            </div>
        </Authlayout>
    )
}

export default Signup