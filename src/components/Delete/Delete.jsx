import axios from "axios";
import React from "react";
import Cookies from 'js-cookie';

const authToken = Cookies.get('authToken');
export const Delete = (props) => {
  const deleteprod = async (id) => {
    try {
      const req = await axios.post(
        `https://johntekvalves.com/backend/api/delete`,{id},{
          headers: {
            'Authorization': `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true 
        }
      );
      //console.log("Deleted successfully:", req.data); // تحقق من الاستجابة
      props.getType();
      props.closedelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> Are you sure you want to delete this product ???{props.id}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <button
          className="btnSub"
          onClick={() => {
            console.log("Delete button clicked:", props.id); // تحقق من الضغط على الزر
            deleteprod(props.id);
          }}
        >
          Yes
        </button>
        <button onClick={props.closedelete}>No</button>
      </form>
    </div>
  );
};
