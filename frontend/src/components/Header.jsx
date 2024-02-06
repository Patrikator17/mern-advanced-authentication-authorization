import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {

    const {currentUser} = useSelector((state) => state.user)


  return (
    <div className='bg-slate-400' >
        <div className='flex justify-between items-center max-w-8xl p-3'>
            <Link to='/'>
                <h1 className='font-bold'>Authentication</h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/about'>
                    <li>About</li>
                </Link>
                <Link to ='/profile'>
                    {currentUser ? (
                        <img src={currentUser.profile_picture} alt='profile' className='h-7 w-7 rounded-full object-cover'/>
                        ) : (
                        
                        <li>Login</li>

                    )}
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header