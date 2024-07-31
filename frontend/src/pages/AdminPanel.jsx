import { useEffect } from "react"
import { FaRegCircleUser } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import ROLE from "../common/role"

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden mt-5">
            <aside className="bg-white min-h-full w-full max-w-60 customShadow">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className="w-20 h-20 rounded-full mt-3" alt={user?.name} />
                            ) : (

                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm">{user?.role}</p>
                </div>


                <div>
                    <nav className="grid p-4">

                        <Link to="dashboard" className="px-2 py-1 hover:bg-slate-100 rounded-lg">
                            Dashboard
                        </Link>
                        <Link to="all-users" className="px-2 py-1 hover:bg-slate-100 rounded-lg">
                            All Users
                        </Link>
                        <Link to="all-products" className="px-2 py-1 hover:bg-slate-100 rounded-lg">
                            All Product
                        </Link>
                        <Link to="orders" className="whitespace-nowrap hover:bg-slate-100 p-2">
                            All Orders
                        </Link>
                        <Link to="loyalty" className="px-2 py-1 hover:bg-slate-100 rounded-lg">
                            Loyalty Program
                        </Link>
                    </nav>
                </div>

            </aside>

            <main className="w-full  h-full p-2">
                <Outlet />
            </main>

        </div>
    )
}
export default AdminPanel