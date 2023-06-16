import {
    useQuery,
} from '@tanstack/react-query'
import { FaUserCheck, FaTrashAlt, FaUserEdit as FaUserPen } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleMakeAdmin = (user) =>{
        fetch(`https://super-resturant-server.vercel.app/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is An Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleUserDelete = (user) =>{

    }

    return (
        <div className='w-full ml-5'>
            <Helmet>
                <title> Special || All users</title>
            </Helmet>
            <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? <button className="btn btn-ghost text-1xl bg-blue-800  text-white"><FaUserCheck></FaUserCheck></button> : 
                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost text-1xl bg-green-600  text-white"><FaUserPen></FaUserPen></button>} </td>

                                <td> <button onClick={() => handleUserDelete(user)} className="btn btn-ghost text-1xl bg-red-500  text-white"><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;