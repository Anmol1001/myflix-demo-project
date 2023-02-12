import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app from './firebase/Firebase'
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { userRef } from './firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'


const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  })

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');

  //here recaptcha code verify that human is accesing the site not a bot.
  const generateRecaptcha = () =>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
      'size': 'invisible',
      'callback': (response)=> {
        
      }
    }, auth)
  }

//this code will verify the sign in.
const requestOtp = () =>{
  setLoading(true);
  generateRecaptcha();
  let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+977${form.mobile}`, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      swal({
        text: "OTP Sent",
        icon: 'success',
        buttons: false,
        timer: 3000
      });
      setOtpSent(true);
      setLoading(false);

    }).catch((error)=>{
      swal({
        text: error.message,
        icon: 'error',
        buttons: false,
        timer: 3000
      })
    }) 
}

const verifyOtp = async () =>{
  try{
    setLoading(true);
    window.confirmationResult.confirm(otp).then((result)=>{
      uploadData();
      swal({
        text: "Done",
        icon: 'success',
        buttons: false,
        timer: 3000
      });
      navigate('/login')
      setLoading(false);
    })

  }catch(error){
    swal({
      text: error.message,
      icon: 'error',
      buttons: false,
      timer: 3000
    });
  }
}

const uploadData =async ()=>{
  try{

  
  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(form.password, salt);
  await addDoc(userRef,{
    name:form.name,
    password: hash,
    mobile: form.mobile
  })
} catch(err){
  console.log(err)
}
}

  return (
    <div className='w-full flex flex-col items-center mt-8'>
    <h1 className='text-xl font-bold'>Sign Up</h1>
    { otpSent?
    <>
   
      <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">OTP</label>
            <input 
            id="message" name="message" 
             value={otp}
             onChange={(e)=>setOtp(e.target.value)}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        
        <div class="p-2 w-full">
          <button 
          onClick={verifyOtp}
          class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg font-bold">{loading?<TailSpin height={25} color="white" />:'Confirm OTP'}</button>
        </div>
        <div>
          <p>Already have an account <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
        </div>
     </>

    :
    <>
    <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">Name</label>
            <input 
            id="message" name="message" 
             value={form.name}
             onChange={(e)=>setForm({...form, name : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

    <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">Mobile No.</label>
            <input 
            type={'number'}
            id="message" name="message" 
             value={form.mobile}
             onChange={(e)=>setForm({...form, mobile : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      
        <div class="p-2 w-full md:w-1/3">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-300">Password</label>
            <input 
            type={'password'}
            id="message" name="message" 
             value={form.password}
             onChange={(e)=>setForm({...form, password : e.target.value})}
            class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <button 
          onClick={requestOtp}
          class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg font-bold">{loading?<TailSpin height={25} color="white" />:'Request OTP'}</button>
        </div>
        <div>
          <p>Already have an account <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
        </div>
        </>
    }
    <div id="recaptcha-container"></div>
    </div>
  )
}

export default Signup;