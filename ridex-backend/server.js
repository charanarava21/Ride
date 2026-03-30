const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "rzp_live_SWvMEmumZVO93F",
    key_secret: "alVnpVmkKf8VU9FxhX4tFKOp"
});

app.post("/create-order", async (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "receipt_order_1"
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send("Error creating order");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));