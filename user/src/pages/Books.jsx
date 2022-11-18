import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';

const Books = () => {
    const [books , setBooks] = useState([]);

    // whenever we run books component, useEffect will run and it's gonna fetch all data 
    // from the backend and set it to books state
    useEffect(()=> {
        const fetchAllbooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/books")
                console.log(res)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllbooks(); // call the function to fetch all books
    },[]) // [] means run once when the component loads
  return (
    <div>
      
     
    </div>
  )
}

export default Books
