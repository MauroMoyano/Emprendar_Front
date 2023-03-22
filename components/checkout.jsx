import React, {useState} from 'react';
import Swal from 'sweetalert2';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function PreviewPage(props) {

  const {id,name, image, description,userId} = props

  const [form,setForm] = useState({
    id: id,
    amount : null,
    name: name,
    image : null
  })



  const handleChange = async (e) => {

      setForm({[e.target.name] : e.target.value})
  }

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      Swal.fire({
        title: 'Gracias por tu donacion.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff ',
        icon: 'success',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/img/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }

    if (query.get('canceled')) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error al procesar el pago',
        text: 'Vuelve a intentarlo de nuevo mas tarde',
    
      })
    }
  }, []);

  return (
    <form action={`${process.env.NEXT_PUBLIC_BACK_APP_URL}/checkout/payment`} method="POST">
      <section>
      <span>$</span>
        <input name='amount' onChange={handleChange} min="1" required value={form.amount} type="number" />
        <input  name='name' hidden onChange={handleChange}   value={name} type="text" />
        <input hidden name='id' onChange={handleChange}  value={id} type="text" />

        <input hidden name='image' onChange={handleChange}  value={image} type="text" />
        <input hidden name='description' onChange={handleChange}  value={description} type="text" />
        <input hidden name='userId' onChange={handleChange}  value={userId} type="text" />


        <button type="submit" role="link">
          DONAR
        </button>
      </section>
      <style jsx>
  {`
    section {
      display: flex;
      flex-direction: column;
      width: 200px;
      justify-content: space-between;
    }
    button {
      height: 36px;
      background: #556cd6;
      border-radius: 4px;
      color: white;
      border: 0;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    }
    button:hover {
      opacity: 0.8;
    }
    section span {
      position: absolute;
      padding: 1rem;
      pointer-events: none;
    }
    section input {
      margin-bottom: .5rem;
      padding: 1rem;
      padding-left: 1.5rem;
    }
  `}
</style>
    </form>
  );
}