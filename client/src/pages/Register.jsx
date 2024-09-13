import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Flip, toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null); // Clear any previous errors

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
            // successful registration 
            console.log(response.data.message);
            reset(); // Reset form fields
            toast.success('Registration Successfull.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data.message)
                // server-side errors
                setServerError(error.response.data.message || 'An error occurred');
            } else {
                setServerError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-lg space-y-4">
            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            <div className="flex flex-col">
                <label htmlFor="Name" className="text-gray-700 font-medium">Name</label>
                <input
                    id="Name"
                    type="text"
                    placeholder="Name"
                    {...register("Name", {
                        required: "Name is required",
                        maxLength: { value: 30, message: "Name cannot exceed 30 characters" },
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                        pattern: { value: /^[A-Za-z]+(?: [A-Za-z]+)*$/i, message: "Name must contain only letters and spaces" }
                    })}
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="Email" className="text-gray-700 font-medium">Email</label>
                <input
                    id="Email"
                    type="email"
                    placeholder="Email"
                    {...register("Email", {
                        required: "Email is required",
                        maxLength: { value: 30, message: "Email cannot exceed 30 characters" },
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: "Invalid email address" }
                    })}
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="Password" className="text-gray-700 font-medium">Password</label>
                <input
                    id="Password"
                    type="password"
                    placeholder="Password"
                    {...register("Password", {
                        required: "Password is required",
                        minLength: { value: 4, message: "Password must be at least 4 characters" },
                        maxLength: { value: 30, message: "Password cannot exceed 30 characters" }
                    })}
                    className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.Password && <p className="text-red-500 text-sm">{errors.Password.message}</p>}
            </div>

            <div className="flex flex-col items-center space-y-2">
                <input
                    type="submit"
                    value={loading ? "Submitting..." : "Submit"}
                    className="py-2 px-4 bg-cgrey cursor-pointer text-white rounded-lg hover:bg-corg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={loading}
                />
                <p className="text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </form>
    );
}

export default Register;

