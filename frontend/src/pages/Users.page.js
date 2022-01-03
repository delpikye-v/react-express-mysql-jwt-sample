import React, { useEffect, useState } from 'react'

import useToken from '../useHook/useToken';
import UserService from './service/user.service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Users.styles.scss'

const UsersPage = () => {
    const { token } = useToken();
    const [listUser, setListUser] = useState([])

    const [message, setMessage] = useState('')

    const fetchData = async () => {
        setListUser([])
        let response = await UserService.list()
        setMessage(response.message)
        if (response.error) {
            return
        }
        setListUser(response.result)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!token.isAdmin) {
        return <div className='text-center error pt-4'>{message}</div>
    }

    const handlerDelete = async (user_id, user_name) => {
        if(window.confirm(`Are you want delete ${user_name}`)) {
            let response = await UserService.delete(user_id)
            if (response.result) {
                setListUser([...listUser].filter(item => item.user_id !== user_id))
                toast("Deleted");
            }
        }
    }

    return (
        <div className='user-container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody className='tbody-list'>
                    {
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.user_name}</td>
                                    <td>{item.email}</td>
                                    <td><button disabled>Edit</button></td>
                                    <td>{(item.is_admin !== 1) &&
                                        <button onClick={() => handlerDelete(item.user_id, item.user_name)}>Delete</button>}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme='dark'
            />
        </div>
    )
}

export default UsersPage
