import clienteAxios from "config/clienteAxios";
import React, { useState, useEffect } from "react";


const ProductDisplay = () =>  {
  
  const handleSubmit = async (e) => {
      e.preventDefault();

      console.log('clickeando')

       const response =  await  clienteAxios.post('/ckeckout/payment')
       console.log(response)
  }

  return(
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form  onSubmit={handleSubmit}>
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
)};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Ckeckout() {



  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}