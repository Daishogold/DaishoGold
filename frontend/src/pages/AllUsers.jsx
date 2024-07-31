import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
    });
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchAllUsers = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error('An error occurred while fetching users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="bg-white pb-4 mt-5">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[calc(100vh-190px)]">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-lg text-gray-600">Loading Users...</p>
                </div>
            ) : (
                <>
                    <table className='w-full userTable'>
                        <thead>
                            <tr className='bg-black text-white'>
                                <th>Sr.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}>
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {openUpdateRole && (
                        <ChangeUserRole
                            onClose={() => setOpenUpdateRole(false)}
                            name={updateUserDetails.name}
                            email={updateUserDetails.email}
                            role={updateUserDetails.role}
                            userId={updateUserDetails._id}
                            callFunc={fetchAllUsers}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;
