import React from 'react';
import "./Landing.css";
import logo from '../assets/images/ai-trading-high-resolution-logo.png'

const Landing = () => {
  return (
    <>
        <section className='Background'>
            <div className='grid-container1'>
                <div className='grid-element1 left'>
                    <form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <br />
                            <input type="email" id="email" name="email" />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="password">Password:</label>
                            <br />
                            <input type="password" id="password" name="password" />
                        </div>
                        <br />
                        <div>
                            <button type="button">Sign in with Google</button>
                            <button type="button">Sign in with Instagram</button>
                        </div>
                        <br />
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
       

                </div>
                <div className='grid-element1 right'>
                    <img src={logo} alt="AI-trading" id="logoImage"/> 

                </div>

            </div>

        </section>

    </>
  );
};

export default Landing;