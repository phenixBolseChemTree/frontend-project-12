import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopUp = () => {
  const notify = () => toast("Wow so easy!", {
    type: 'success',
    position: 'top-right'
  });

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default PopUp;

// import React, { useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/ReactToastify.min.css";

// const PopUp = ({ operation }) => {
//   useEffect(() => {
//     if (operation === "addChannel") {
//       toast("Канал создан", {
//         type: "success",
//         position: "top-right",
//       });
//     } else if (operation === "removeChannel") {
//       toast("Канал удалён", {
//         type: "success",
//         position: "top-right",
//       });
//     } else if (operation === "renameChannel") {
//       toast("Канал переименован", {
//         type: "success",
//         position: "top-right",
//       });
//     }
//   }, [operation]);

//   return (
//     <div>
//       <ToastContainer position="top-right" newestOnTop />
//     </div>
//   );
// };

// export default PopUp;
