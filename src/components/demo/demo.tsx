"use client"
import React from 'react'
import { authService } from '@/api/services/authService'

//just for demo of api testing, will be removed later
const Demo = () => {
    const response = async ()=> {
    const data = await authService.register({username:'testuser1', email:'testuser1@gmail.com', password:'password123', displayName:'Test User'});
    console.log(data);
    }
    const login = async ()=> {
    const data = await authService.login({email:'testuser1@gmail.com', password:'password123'});
    console.log(data);
    }
  return (
    <div>
      <button onClick={response}>Register</button>
      <br />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Demo
