const express = require('express');

var mymodule = require('../app.js')

const login = (req,res,next)=>{
    if(!req.session.userid){
        res.redirect('/login');
    }
    else{
        next()
    }
}

module.exports = function(main){
main.use('/profile',login,(req,res,next)=>{
    
    database.query('Select * from relationship where id=?',[req.session.my_id],(err,rows)=>{
       app.locals.friends=rows;
       next()
        
       
    })
});


main.get('/profile',(req,res)=>{
    database.query('select * from posts where id =? or id in (select friends_id from relationship where id=?) order by created_at DESC',[req.session.my_id,req.session.my_id],(err,rows)=>{
        app.locals.rows=rows;
        links =req.session.myname;
        res.render('newsfeed',{link:links});

    })

       

        
    })



};