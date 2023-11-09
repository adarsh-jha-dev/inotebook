const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // Force IPv4
  })
  .then(()=>{
    console.log("Connected to Mongo Successfully");
  })
  .catch(()=>{
    console.log("Some Error Occured");
  })
}

module.exports = connectToMongo;
