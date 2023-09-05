import React from "react";

const Modal = () => {

  // <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="modal-header">
  //         <div class="modal-title h4">Add</div>
  //         <button type="button" class="btn-close" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <form>
  //           <div class="form-group">
  //             <input class="form-control" data-testid="input-body" name="body" required="" value="" />
  //           </div>
  //           <input class="btn btn-primary" type="submit" value="submit" />
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  return (
    <div class="mb-3">
      <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
    </div>
  )
}

export default Modal;