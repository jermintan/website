const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_yourPriceId', // Use your Price ID from Stripe
          quantity: 1,
        },
      ],
      success_url: 'https://your-site.netlify.app/success.html',
      cancel_url: 'https://your-site.netlify.app/cancel.html',
      // Uncomment to add a free trial
      // subscription_data: { trial_period_days: 30 },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
