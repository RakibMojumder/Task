const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle wares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// connect mongodb database
const uri = "mongodb+srv://Task:rnIBZCPSZUl4lzg9@cluster0.zzty5cj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbConnect = async () => {
    try {
        await client.connect();
        console.log("database connected successful");
    } catch (error) {
        console.log(error.message);
    }
}
dbConnect();

// Database collection
const Users = client.db('Task').collection('users');

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/user', async (req, res) => {
    try {
        const { email } = req.query;
        const user = await Users.findOne({ email });
        if (user) {
            delete user.password;
            res.json({
                success: true,
                user,
                message: "Successfully find the user"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

app.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const isUserExists = await Users.findOne({ email: user.email });

        if (isUserExists) return res.json({ success: false, message: "User email already exists" });

        const result = await Users.insertOne(user);
        if (result.insertedId) {
            res.json({
                success: true,
                message: 'successfully become a user'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailMatched = await Users.findOne({ email });
        const isPasswordMatched = await Users.findOne({ password });

        if (isEmailMatched && isPasswordMatched) {
            return res.json({
                success: true,
                message: "Successfully log in"
            })
        };

        return res.json({
            success: false,
            message: "Email or password is incorrect"
        });
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(5000, () => console.log("Server is running on port 5000"));