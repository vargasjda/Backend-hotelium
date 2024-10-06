const mongo = require("mongoose")

const dbConectionMongo = async () => {
    const db_uri = process.env.DB_URI 
   await mongo.connect(db_uri).then((res) => {
    console.log("connect megalong");
   })
   .catch((err) => {
     console.log(err);
   }) 
    
}

module.exports = dbConectionMongo;