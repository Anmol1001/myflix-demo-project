import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky z-10 header text-3xl text-red-500 flex justify-between font-bold p-3 border-b-2 border-gray-500'>
    <Link to={'/'}><span>My<span className='text-white'>Flix</span></span></Link>

    <Link to={'/addmovie'}>
    <h1 className='text-lg text-white cursor-pointer flex items-center'>
    <Button><AddBoxIcon className='mr-1'/><span className='text-white'>Add New</span></Button>
    </h1>
    </Link>

    </div>
  )
}

export default Header;