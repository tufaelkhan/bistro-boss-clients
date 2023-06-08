import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect  } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import './CheckOutForm.css'

const CheckOutForm = ({cart, price}) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    useEffect(()=>{
      // console.log(price);
      if(price > 0){
        axiosSecure.post('/create-payment-intent', {price})
      .then(res =>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
      }
    },[price, axiosSecure])
// console.log(clientSecret)
    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log('function is calling');

        if(!stripe || !elements){
          // console.log('stripe not found', stripe)
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        console.log('card', card);
        const {error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('error', error);
            setCardError(error.message)
        }else{
            setCardError('')
            // console.log('payment method', paymentMethod);
        }

        setProcessing(true)
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displyaName || 'unknown'
              },
            },
          },
        );

          if(confirmError){
            console.log(confirmError);
          }
          console.log('payment intent ',paymentIntent);

          setProcessing(false)
          if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);
            //save payment information to the server
            const payment = {email: user?.email,
               transactionId: paymentIntent.id,
              price,
              date: new Date(),
            quantity: cart.length,
            cartItems: cart.map(item => item._id),
            menuItems: cart.map(item => item.menuItemId),
            status: 'service pending',
            itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
            .then(res =>{
              console.log(res.data);
              if(res.data.insertedId){
                // display confirm
              }
            })
          }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-primary mt-7 btn-sm" type="submit" disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
    </form>
            {cardError && <p className='text-3xl text-red-600'>{cardError}</p>}
            {transactionId && <p className='text-green-600'>Transaction Complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckOutForm;