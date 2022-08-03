const express = require('express')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require("path")
const multer = require("multer")
const db = require('./config/db');
const router = require("./routes/route")
const PORT = 8800


app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors())

app.use("/images", express.static(path.join(__dirname, "public/images")));
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }
})


const upload = multer({ storage: storage }).single("file");
app.post("/api/upload", upload, (req, res) => {
  try {
    return res.status(200).json("The image file has been saved");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api",router)

app.get('/api/users', (req, res) => {
    db.query("SELECT * FROM user", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})




app.listen(PORT,() => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})