import React, { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/Firebase'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'

const DetailPage = () => {
  const {id} = useParams();//the parameter id has come from the App.js file where we route the DetailPage.
  const [data,setData] = useState({
    Title:"",
    Year: "",
    Image: "",
    Description:"",
    
  })
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    async function getData(){
      const _doc = doc(db,'movies',id)
      const _data = await getDoc(_doc)
      setData(_data.data());
      setLoading(false)
    }
  
    getData();
    
  }, [])
  
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full'>
    {
    loading ? <div className='h-96 w-full flex justify-center items-center'><ThreeCircles height={100} color='white' /></div>
      :
      <>
    <img className ='h-96 block md:sticky top-24' src={data.Image} alt="" />
    <div className="md:ml-4 ml-0 w-full md:w-1/2">
        <h1 className='text-3xl font-bold text-gray-400'>{data.Title} <span className='text-xl'>{data.Year}</span></h1>
        <ReactStars
            size={20}
            value={4.5}
            edit={false}
            half={true}
            className='mt-3'
        />
        <p className='mt-3'>{data.Description}</p>

        <Review />
      
    </div>
    
    </>
    }
    </div>
  )
}

export default DetailPage;