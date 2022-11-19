import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Books = () => {
    const [books , setBooks] = useState([]);

    // whenever we run books component, useEffect will run and it's gonna fetch all data 
    // from the backend and set it to books state
    useEffect(()=> {
        const fetchAllbooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
                console.log(res)
            }catch(err){
                console.log(err);
            }
        }
        fetchAllbooks(); // call the function to fetch all books
    },[]) // [] means run once when the component loads

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/books/${id}`);
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    };

    /// <!-- key is required for react to know which element to update -->
  return (
    <div>
      <h1>Hane's BookShop</h1>
      <div className="books">
        {
            books.map(books=>(
                <div className="book" key={books.id}>  
                    {books.cover && <img src={books.cover} alt="" />} 
                    <h2>{books.title}</h2>
                    <p>{books.desc}</p>
                    <button className='delete' onClick={()=> handleDelete(books.id)}>Delete</button>
                    <button className="update">
              <Link
                to={`/update/${books.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
                </div>
            ))
        }
      </div>

      <button>
        <Link to="/Add"> Add new book </Link>
      </button>
     
    </div>
  )
}

export default Books
