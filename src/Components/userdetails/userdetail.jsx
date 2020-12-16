import React from 'react'
import './style.css'

const UserDetails = ({user}) => {
    return (
        <div className='user_details'>
            <span className='user_id'>{user.id}</span>
            <div className='user_title'>
                <span className='user_name'>{user.name}</span>
                <span className='user_surname'>{user.surname}</span>
            </div>
            <p className='user_desc'>{user.desc}</p>
        </div>
    )
}

export default UserDetails