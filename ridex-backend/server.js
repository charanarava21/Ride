const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "rzp_test_SWvRFXelQNYrvv",
    key_secret: "dKw0wFt2npFAwy68yBfogH2a"
});

// Create Order API
app.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // paise
            currency: "INR",
            receipt: "order_rcptid_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));