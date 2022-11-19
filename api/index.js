import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()




const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "Mysql99.",
    database:"bookapp"
})


// if there is any auth problem 
///ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Mysql99.';


// how to reach our backend server
/// this is how we do api request using an 



// at first we cannot send anything from the client to our express server because we have not set up the middleware
// we need to set up the middleware to be able to send data from the client to our express server
// it will allow us to send data from the client to our express server
app.use(express.json()) // this is the middleware that will allow us to send data from the client to our express server
app.use(cors()) // this is the middleware that will allow us to send data from the client to our express server

app.get("/", (req,res)=>{
    res.json("backend here ");
})


app.get("/books",(req,res)=>{
    const q ="select * from books"
    db.query(q,(err,data)=>
    {
        if(err) return res.json(err)
        return res.json(data)
    })
})



/// post, because we are going to send books details

app.post("/books",(req,res)=>
{
    //const q= "INSERT INTO books ('title','desc', 'cover') VALUES (?)";
    const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
    ///////BETTER NOT FORGET THE TYPE OF ` AND ' THEY'RE NOT THE SAME 
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    const q2= "INSERT INTO books VALUES ('5','title2 from backend', 'desc2 from backend', 'cover2 from backend');";

    db.query(q,[values], (err,data)=>
    {
        if(err) return res.json(err);
        return res.json("book has been created succesfuly!!!")
    })
})


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?,  `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800,()=> {
console.log("connected to BackEnd!");
});

