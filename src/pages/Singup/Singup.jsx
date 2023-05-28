/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../providers/AuthProvider';

const Singup = () => {
    const {createUser} = useContext(AuthContext);


    const handleSingup = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
        .then((result) => {
           const user = result.user;
           console.log(user);
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
                        <h1 className="text-5xl font-bold text-center my-12">Sing up</h1>
                        <form onSubmit={handleSingup}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered" />
                            </div>
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
                        <p className='my-4 text-center'>Already Have An Account <Link className='text-orange-600 font-bold' to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singup;