/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { singInUser, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    console.log(location);
    let from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        singInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mx-12 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
                    <div className="card-body px-12">
                        <h1 className="text-3xl font-bold text-center my-12"></h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Your Password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn normal-case bg-orange-600 border-none" type="submit" value="Sing in" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New to car doctors <Link className='text-orange-600 font-bold' to="/singup">Sing up</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;