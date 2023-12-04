import axios from "axios";
import { useEffect, useState, useContext } from "react";

import CarteContext from "../../../../usecontext/Context";

function Buyca({ df, name, email, phone, country, city, adress }) {

  const Api =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RjMU5EWTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuVDZuVnNVZmxMaWk0bTJCa2d4cjlkTFg3eFlIaFo1dm04TjRVbmE4NUprVTIwV0EyYkc3bld0ZGNGOWZNQkItNF9XQkVZZFZidWJ5dUk0eHdGLVpUS2c=";
  async function firststup() {
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/auth/tokens",
        {
          api_key: Api,
        }
      );

      const token = response.data.token;
      secondstep(token);
    } catch (error) {
      console.error(error);
    }
  }

  async function secondstep(token) {
    const items = df.map((item) => ({
      name: item.name,
      amount_cents: item.price,
      description: item.name,
      quantity: item.quantity,
    }));
    console.log(items, ".............");
    let data = {
      auth_token: token,
      delivery_needed: "false",
      amount_cents: "100",
      currency: "EGP",
      items: items,
    };

    let request = await fetch(
      "  https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    let id = response.id;
    thridsetup(token, id);
  }




  async function thridsetup(token, id) {
    
const data={
    "source": {
      "identifier":phone, 
      "subtype": "WALLET"
    },
    "payment_token": token  // token obtained in step 3
  }
console.log(data);
    let request = await fetch(
      " https://accept.paymob.com/api/acceptance/Payments/pay",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    let thetoken = response.token;
    cardpayments(thetoken);
    console.log(thetoken);
  }







//   async function thridsetup(token, id) {
//     let data = {
//       auth_token: token,
//       amount_cents: "100",
//       expiration: 3600,
//       order_id: id,
//       billing_data: {
//         apartment: "803",
//         email: email,
//         floor: "42",
//         first_name: name,
//         street:adress,
//         building:adress,
//         phone_number:phone,
//         shipping_method: "PKG",
//         postal_code: "01898",
//         city:city,
//         country:country,
//         last_name: "___",
//         state: "Utah",
//       },
//       currency: "EGP",
//       integration_id: 4092052,
//     };
//     let request = await fetch(
//       "https://accept.paymob.com/api/acceptance/payment_keys",
//       {
//         method: "post",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       }
//     );
//     let response = await request.json();
//     let thetoken = response.token;
//     cardpayments(thetoken);
//   }

  async function cardpayments(thetokentoken) {
    let iframurl = `https://accept.paymob.com/api/acceptance/iframes/780383?WALLET_token=${thetokentoken}`;
    location.href = iframurl;
  }

  return (
    <>
      <div className="border-solid border-black border w-[70%] m-auto">
        <button
          onClick={firststup}
          className="bg-slate-800 w-[80%] fixed shadow-md shadow-gray-700 bottom-8 font-black text-white rounded h-10 hover:bg-slate-700"
        >
          Pay With paymob
        </button>{" "}
      </div>
    </>
  );
}

export default Buyca;
