/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ServiceDetails = () => {
    const detail = useLoaderData();
    const {_id} = detail
    return (
        <div>
            <div className='grid grid-cols-3'>
                <div className="card w-96 bg-base-100 shadow-xl p-10  ">
                    <figure><img className='rounded-lg' src={detail.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-6xl text-pink-700">{detail.title}</h2>
                        <p>{detail.description}</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl p-10  ">
                    <div className="card-body">
                        <h2 className="card-title text-6xl text-pink-700">{detail.title}</h2>
                        <p>{detail.description}</p>
                    </div>
                    <figure><img className='rounded-lg' src={detail.img} alt="Shoes" /></figure>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl p-10  ">
                    <figure><img className='rounded-lg' src={detail.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-6xl text-pink-700">{detail.title}</h2>
                        <p>{detail.description}</p>
                    </div>
                </div>
            </div>
            <Link to={`/book/${_id}`}>
            <button className="btn btn-active btn-secondary">Proceed Checkout </button>
            </Link>
        </div>
    );
};

export default ServiceDetails;

