import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
      // taking values from our inputs and send them to the backend

      const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
      })
      // whenever i type something in the input, it's gonna update the state


      const handleChange = (e) => {
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))// update the state
        console.log(book)
      }

      const navigate  = useNavigate()

      /// if we are making any API request we have to use async await
      const handleClick = async (e) => {
        // send the data to the backend
        e.preventDefault(); // prevent the page from refreshing 
        // with axios we're gonna send our data 
        try{
          await axios.post("http://localhost:8800/books",book);
          navigate("/")// if no error, navigate to the home page
        } catch(err){
          console.log(err)
        }
      
      }
  return (

    
    <div>
      <form className="form">
        <h1>Add new Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title' />
        <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
        <button onClick={handleClick}>Add</button>

      </form>

    </div>
  )
}

export default Add
