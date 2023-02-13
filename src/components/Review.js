import React, { useState, useEffect, useContext } from 'react'
import ReactStars from 'react-stars'
import { reviewRef, db} from './firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'; // where tells where is the query in the firebase and return it. getDocs will give us multiple documents and getDoc will give us single document.
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom'
import { Appstate } from '../App';

const Review = ({ prevRating, userRated}) => {
    const navigate = useNavigate()
    const useAppstate = useContext(Appstate);
    const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false)
    const [input, setInput] = useState('')
    const [data, setData] = useState([])
    const [newAdded, setNewAdded] = useState(0);

   
    

    const sendReview = async () =>{
        setLoading(true)
        try {
            if(useAppstate.login){
            await addDoc(reviewRef, {
                movieid: id,
                name: useAppstate.userName,
                rating: rating,
                thoughts: input,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, 'movies', id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1 
            })

            swal({
                title:"Done",
                icon:"success",
                buttons:false,
                timer: 3000
            })
            setRating(0)
            setInput('')
            setNewAdded(newAdded + 1);
        }else{
            navigate('/login');
        }
        

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

     //here we are getting the review section.
     useEffect(() => {
        async function getData(){
          setReviewLoading(true);
          let quer = query(reviewRef, where('movieid','==', id))
          const querySnapshot = await getDocs(quer);
  
          querySnapshot.forEach((doc)=>{
              setData((prev)=>
                  [...prev,doc.data()]
              )
          })
          setReviewLoading(false)
        }
      getData();
        
      }, [newAdded])

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

            {
                reviewLoading ? <div className='mt-6 flex justify-center'>
                    <ThreeDots height={15} color='white' />
                </div>:
                <div className='mt-4'>
                    {
                        data.map((e,i)=>{
                            return (

                    <div key={i} className=' p-2 w-full border-b border-gray-800 mt-2 header bg-opacity-50'>
                    <div className='flex items-center'>

                    <p className='text-blue-500'>{e.name}</p> 
                    <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                    </div> 
                    <ReactStars 
                    size={15}
                    half={true}
                    value={e.rating}
                    edit={false}            
                    />
                    <p>{e.thoughts}</p>
                    
                                </div>
                            )
                            
                        })
                    }
                </div>
            }
    </div>
  )
}

export default Review