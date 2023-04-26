require("dotenv").config();

const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretKey);

module.exports.checkoutSession = async (req, res, next) => {

    try {

    const {product_name, price, quantity} = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: product_name
              },
            unit_amount: price
            },
            quantity: quantity,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/StripePaymentSuccess",
        cancel_url: "http://localhost:3000/StripePaymentCancel",
      });

      res.status(200).send({message: "Success", data: {id: session.id}})

    }
    catch (error) {
        res.status(400).send({ error: error, message: "Payment checkout session failed"})
      }

}