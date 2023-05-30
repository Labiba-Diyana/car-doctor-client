/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Book = () => {
    const checkout = useLoaderData();
    const { price, title, _id, img} = checkout;
    const { user } = useContext(AuthContext)

    const handleCheckOut = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            custerName: name,
            email,
            date,
            img,
            service_id: _id,
            service: title,
            price: price
        }
        console.log(booking);
        fetch('https://car-doctor-server-eight-dusky.vercel.app/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                alert('User saved successfully')
            }
        })

    }

    return (
        <div className='my-14 space-y-10'>
            <h2 className='text-center text-4xl font-bold text-orange-600'>Check- Out Service : {title}</h2>
            <div className='card-body'>
                <form onSubmit={handleCheckOut} className='space-y-10'>
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.name} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" readOnly name="email" defaultValue={user?.email} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="amount" defaultValue={'$' + price} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-error btn-block" type="submit" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Book;