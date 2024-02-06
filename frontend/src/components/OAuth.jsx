import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'


const OAuth = () => {

    const dispatch = useDispatch();

    const handleGoogleClick = async() =>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            // console.log(result);
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photo

              })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
        } catch(error){
          console.log('Could not login with google', error);
        }
    }


  return (
  
  <button 
  type='button' onClick={handleGoogleClick}
  className={`bg-red-700 text-white rounded-md p-2 uppercase hover:opacity-95 disabled:opacity-80`}>Continue with Google</button>
    
  )
}

export default OAuth