import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../component/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import '../index.css';

function PosPage() {

    const [product,setProduct] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [cart,setCart] = useState([]);
    const [totalAmount,setTotalAmount] = useState(0);

    const fetchProduct = async()=>{
        setIsLoading(true);
        const result = await axios.get('http://localhost:5000/product');
        setProduct(await result.data);
        setIsLoading(false);
    };

    const addProductToCart = async(product)=>{
        // check if the adding product exist
        let findProductInCart = await cart.find(i=>{
            return i.id === product.id
        });

        if (findProductInCart){
            let newCart = [];
            let newItem;

            cart.forEach(cartItem =>{
                if(cartItem.id === product.id){
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem);
                }else{
                     newCart.push(cartItem);
                }
            });

            setCart(newCart);
            toast(`Added ${newItem.name} to cart`)

        }else{
            let addingProduct = {
                ...product,
                'quantity':1,
                'totalAmount':product.price
            }
            setCart([...cart,addingProduct]);
            toast(`Added ${product.name} to cart`)
        }
    }

    const removeProduct = async(product)=>{
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
    const handlePrint = () =>{
        handleReactToPrint();
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    useEffect(()=>{
        let newTotalAmount = 0;
        cart.forEach(icart =>{
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);            
        })
        setTotalAmount(newTotalAmount);
    },[cart]);

  return (
    <>
        <MainLayout>
            <div className='row'>
                <div className='col-lg-8'>
                    {isLoading ? "loading" : <div className='row'>
                    {product.map((product, key)=>
                        <div key={key} className='col-lg-4'>
                            <div className='pos-item border px-3 text-center' onClick={()=>addProductToCart(product)}>
                                <p>{product.name}</p>
                                <img src={product.image}  className='img-fluid' alt={product.image} />
                                <p>${product.price}</p>
                            </div>
                        </div>
                    )}
                        </div>}
                    
                </div>
                <div className='col-lg-4'>
                    <div style={{display:"none"}}>
                        <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
                    </div>
                    <div className='table-responsive bg-dark'>
                        <table className='table table-responsive table-dark table-hover'>
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
                                        <td>
                                            <button className='btn btn-danger btn-sm' onClick={()=> removeProduct(cartProduct)}>Remove</button>
                                        </td>
                                    </tr>
                                    ): 'No Item in cart'}
                                </tbody>
                            </th>
                        </table>
                        <h2 className=' px-2 text-white'>Total Amount : ${totalAmount}</h2>
                    </div>
                    <div className='mt-3'>
                        {
                            totalAmount !== 0 ? <div>
                                <button className='btn btn-primary' onClick={handlePrint}>Pay Now</button>
                            </div> : 'Please Add Product to cart'
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    </>
  )
}

export default PosPage;