import React from 'react'
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

function HomePage() {
  return (
    <>
        <MainLayout>
        <div className='bg-light p-5 mt-4 rounded-3'>
                    <h1>Welcome to the Simple Pos Testing</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates dicta quia corporis magnam. Consectetur
nobis minima, odio consequatur amet in velit minus, at omnis totam cupiditate, molestias error? Et.</p>
                    <p>If you have any issue, contact tinthtooko@gmail.com or call 0912345679 anytime</p>
                    <Link to='/pos' className='btn btn-primary'>Click Here to sell product</Link>
                </div>
        </MainLayout>
    </>
  )
}

export default HomePage;