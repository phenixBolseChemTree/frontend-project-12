import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const types = ["success", "info", "warning", "error"];

const ToastFeedback = ({ addNotification }) => {
  return (
    <div>
      <button onClick={addNotification}>Add notification</button>
      <hr />
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
};

export default ToastFeedback;