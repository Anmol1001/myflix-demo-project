import { getDocs } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { moviesRef } from './firebase/Firebase'

const Cards = () => {
    const [data,setData] = useState([
      
    ])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        async function getData(){
            setLoading(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc)=>{
                setData((prev)=>[...prev,doc.data()])
            })
            setLoading(false);
        }
        getData();
    },[])
  return (
    <div className='flex flex-wrap justify-between p-3 mt-2'>
    {   loading ?<div className='w-full flex justify-center items-center h-96'> <ThreeDots height={40} color='white'/> </div> : 
        data.map((e,i)=>{
            return (
        
        <div key={i} className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
            <img className='h-72 ' src={e.Image}/>
            <h1><span className='text-gray-500 p-2'>Name:</span>{e.Title}</h1>
            <h1 className='flex items-center'>
            <span className='text-gray-500 p-2 mr-1'> Rating:</span>
            <ReactStars 
                size={20}
                value={5}
                edit={false}
                half={true}
            /></h1>
            <h1><span className='text-gray-500 p-2'>Year:</span> {e.Year}</h1>
        </div>
        )})
    }
       
    </div>
  )
}

export default Cards;