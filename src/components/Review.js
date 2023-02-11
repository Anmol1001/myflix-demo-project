import React, { useState } from 'react'
import ReactStars from 'react-stars'
import { reviewRef } from './firebase/Firebase';
import { addDoc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';

const Review = () => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('')

    const sendReview = async () =>{
        setLoading(true)
        try {
            await addDoc(reviewRef, {
                moviesid: '',
                name: 'Anmol Pokhrel',
                rating: rating,
                thoughts: input,
                timestamp: new Date().getTime()
            })
            swal({
                title:"Done",
                icon:"success",
                buttons:false,
                timer: 3000
            })
            setRating(0)
            setInput('')
        } catch (error) {
            swal({
                title: error.message,
                icon:"error",
                buttons:false,
                timer: 3000
                
                
            })
        }
     setLoading(false);  
    }

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars 
                size={35}
                half={true}
                value={rating}
                onChange={(rate)=>setRating(rate)}
            />
        <input 
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            placeholder='Share your thoughts'
            className='w-full p-2 outline-none header'
        />
        <button onClick={sendReview} className='bg-red-500 flex justify-center w-full p-2'>
        { loading ? <TailSpin color='white' height={30}/> :
            'Share' }</button>
    </div>
  )
}

export default Review