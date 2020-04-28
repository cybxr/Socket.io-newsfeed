var db = require('../app.js');


module.exports.id = function(){

    database.query('Select * from users where name=?',[req.session.mypr])
}
module.exports.online = function(room,socket){
        return new Promise((resolve,reject)=>{
       database.query('Insert into online(id,status,room) values(?,?,?)',[socket.request.session.my_id,1,room],(err,rows)=>{
       database.query("select room from online where id in(select friends_id from relationship where id=?)",[socket.request.session.my_id],(err,rows)=>{
            if(rows.length >0){
                 for(i=0;i<rows.length;i++){
                     
                     socket.join(rows[i].room)
                     resolve();
                 }}
            else{
            resolve();
        
        }})
        if(err){reject()}
        else{
           resolve();
       }
    })})};
    

module.exports.userfeed = function(message,email,socket){
    database.query('INSERT INTO posts (id,post,name) values(?,?,?)',[socket.request.session.my_id,message,socket.request.session.myname],(err,rows)=>{
        if(err){console.log(err);}
    })

};

module.exports.newconnect =  function(socket){
    return new Promise((resolve,reject)=>{
    database.query('Select room from online where id in(select friends_id from relationship where id =?)',[socket.request.session.my_id],(err,rows)=>{
        if(err){console.log(err);}
    
        if(rows.length>0){
            socket.join(rows[0].room);
            resolve();
        }
        else{
            resolve();
        }
    })
})};

module.exports.disconnect=function(user){

    database.query('delete from online where room=?',[user],(err,rows)=>{
        if(err){console.log(err);}
    })
}
