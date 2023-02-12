import React, { useContext } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppState = useContext(Appstate);
  return (
    <div className='sticky z-10 header text-3xl text-red-500 flex justify-between font-bold p-3 border-b-2 border-gray-500'>
    <Link to={'/'}><span>My<span className='text-white'>Flix</span></span></Link>

    { useAppState.login ?
      <Link to={'/addmovie'}>
    <h1 className='text-lg text-white cursor-pointer flex items-center'>
    <Button><AddBoxIcon className='mr-1'/><span className='text-white'>Add New</span></Button>
    </h1>
    </Link>
    :
    <Link to={'/login'}>
    <h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
    <Button><span className='text-white font-medium capitalize'>Login</span></Button>
    </h1>
    </Link>
    }

    </div>
  )
}

export default Header;