import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from './firebase/Firebase';
import swal from 'sweetalert'

const AddMovie = () => {
  const [form, setForm] = useState({
    Title:"",
    Year: "",
    Description:"",
    Image: ""
  })

  const [loading, setLoading] = useState(false); //this wiil set a design when the page is loading.

  const addMovie = async ()=>{
    setLoading(true);
    try{

      await addDoc(moviesRef, form);
      swal({
        title:"Added",
        icon:"success",
        buttons:false,
        timer: 3000
      })
      setForm({
        Title:"",
        Year: "",
        Description:"",
        Image: ""
      })
    }catch(err){
      swal({
        title:err,
        icon:"error",
        buttons:false,
        timer: 3000
      })
    }
    setLoading(false);
  }//here we are adding moving

  return (
    <div className=''>
      <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-8 mx-auto">
    <div class="flex flex-col text-center w-full mb-4">
      <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add New Movie</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-300">Title</label>
            <input type="text" id="name" name="name"
             value={form.Title}
             onChange={(e)=>setForm({...form, Title : e.target.value})}
             class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-300">Year</label>
            <input type="email" id="email" name="email" 
             value={form.Year}
             onChange={(e)=>setForm({...form, Year : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">Image Link</label>
            <input id="message" name="message" 
             value={form.Image}
             onChange={(e)=>setForm({...form, Image : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">Description</label>
            <textarea id="message" name="message" 
             value={form.Description}
             onChange={(e)=>setForm({...form, Description : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={addMovie}class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg">{loading?<TailSpin height={25} color="white" />:'Submit'}</button>
        </div>
              
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMovie