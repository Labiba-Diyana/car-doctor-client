/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
    const { _id,img, title, price } = service;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-6 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl h-52" />
                </figure>
                <div className="card-body space-y-7">
                    <h2 className="card-title text-3xl font-bold">{title}</h2>
                    <div className='flex'>
                        <p className='text-2xl font-semibold text-orange-600'>Price: ${price}</p>
                        <div className="card-actions">
                            <Link to={`/service/${_id}`}>
                                <button className="btn btn-circle btn-outline text-orange-600">
                                    <IoIosArrowRoundForward className='text-4xl'></IoIosArrowRoundForward>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;