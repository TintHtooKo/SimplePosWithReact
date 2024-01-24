import React from "react";



export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart,totalAmount} = props;
    return (
      <div ref={ref} className="p-5">
        <table className='table'>
                            <th>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Qty</td>
                                        <td>Total</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    { cart ? cart.map((cartProduct, key)=>
                                    <tr key={key}>
                                        <td>{cartProduct.id}</td>
                                        <td>{cartProduct.name}</td>
                                        <td>{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>{cartProduct.totalAmount}</td>
                                        
                                    </tr>
                                    ):''}
                                </tbody>
                            </th>
                        </table>
                        <h2 className='px-2'>Total Amount : ${totalAmount}</h2>
      </div>
    );
  });