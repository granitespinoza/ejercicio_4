import express from 'express';
import fs from "fs";

const app = express();

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error){
        console.log(error);
    }
    
};

const writeData =(data) => {
    try{
        fs.writeFileSync("./db.js", JSON.stringify(data));  
    } catch (error){
        console.log(error);
    }
}
 
app.get("/", (req, res) => {
    res.send(" welcome to my first API with Node js ");

});

app.get("/books" , (req,res) => {
    const data = readData();
    res.json(data.books); 
})

app.get("/books/:id", (req,res) => {
    const data = readData();
    const id = parseInt (req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book); 
})

app.listen(8005,()=>{
    console.log(' Server listing on port ----> 8005 <----- ');

});


