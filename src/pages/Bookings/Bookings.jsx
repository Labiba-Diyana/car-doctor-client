/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://car-doctor-server-eight-dusky.vercel.app/bookings?email=${user.email}`,{
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data);
                }
                else{
                     navigate('/');
                }
            })
    }, [])

    const handleDelete = id => {
        const proceed = confirm('Are you sure you want to delete');
        if (proceed) {
            fetch(`https://car-doctor-server-eight-dusky.vercel.app/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Your data has successfully deleted')
                        const remaining = bookings.filter(book => book._id !== id)
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleUpdate = id => {
        fetch(`https://car-doctor-server-eight-dusky.vercel.app/bookings/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.modifiedCount > 0){
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm';
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Image</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Detail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(booking => <BookingRow
                            key={booking._id}
                            booking={booking}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        ></BookingRow>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;