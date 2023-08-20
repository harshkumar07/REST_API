const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8002;
const app = express();

app.use(express.urlencoded({ extended: false}));

app.get("/api/users/:id",(req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.patch("/api/users/:id",(req,res) =>{
    return res.json({ status : "Pending"});
})

app.delete("/api/users/:id",(req, res)=>{
    return res.json({ status :"Pending"});
})

app.post("/api/users",(req,res)=>{
    const body = req.body;
    users.push({...body , id: users.length+1});
    fs.appendFile("./MOCK_DATA.json" ,JSON.stringify(body),(err,data)=>{
        return res.json({ status :"Success" ,id: users.length+1});
    });
    
});

// for html rendering

app.get("/users",(req,res)=>{
    const html =`
    <ul>
    ${users.map((users) =>`<li>${users.first_name}</li>`).join("")}</ul>`
    return res.send(html);
})

//api rendering return json
app.get("/api/users",( req , res)=>{
    return res.json(users);
})



app.listen(PORT,()=>{console.log("Server Started!")});