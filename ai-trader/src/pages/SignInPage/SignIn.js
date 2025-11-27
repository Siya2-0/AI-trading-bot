import React, {useState} from 'react';
import "./SignIn.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link, useNavigate} from 'react-router-dom';

import logo from '../../../src/assets/images/ai-trading-high-resolution-logo.png'

const Landing = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleEmailChange = (e) => {
            setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
        
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Email is required.');
        } else if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
        } 
        else {
            setErrorMessage('');
            // Proceed with form submission
            console.log('Email:', email);
            navigate('/dashboard');
          
        }
    };

  return (
     <>
     
   
    <main className='LoginPage'>
        <section className='PromptBox'>

            <header className='headerArea'>
                <div> 
                    <div className='LogoContainer'>
                        <img src={logo} alt="AI-trading" id="logoImage"/> 
                    </div>
                    <h3>Welcome Back </h3>
                    <div><p>Please enter your details below to sign in</p></div>
                </div>
                
            </header>

            <div className='FormArea'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="input-container">
                        <input type="email" id="email" name="email" required  placeholder=" " value={email} onChange={handleEmailChange}/>
                        <label htmlFor="email">Email Address*</label>
                    </div>
                            
                    <div className="input-container">
                        <input type={showPassword ? "text" : "password"} id="password" name="password" required  placeholder=" " value={password} onChange={handlePasswordChange} />
                        <label htmlFor="password">Password*</label>
                        <span
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                        >
                        <i
                            className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                            aria-hidden="true">

                        </i>
                        </span>
                    </div>


                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p><a href='' id='forgot-password-link'>Forgot Password?</a></p>
                
                    <div className='Login-Button-Container'>
                        <button type="submit" className='Login-Button' >Sign In</button>
                    </div>
                         
                    <div className='Login-Button-Container'>
                        <button type="button" className='Login-Button'><i className="google-icon fab fa-google"></i>Sign in with Google</button>
                    </div>
                    <p>Don't have an account? <Link to='/signup' id='sign-up-link'>Sign up</Link></p>
                
                       
                         
            </form>

            </div>
        
        </section>

    </main>

    </>
  );
};

export default Landing;



/**
 * 
 * 
 *  //     <section className='Background'>
    //         <div className='grid-container1'>
    //             <div className='grid-element1 left'>
    //                 <form>
    //                     <div>
    //                         <label htmlFor="email">Email:</label>
    //                         <br />
    //                         <input type="email" id="email" name="email" />
    //                     </div>
    //                     <br />
    //                     <div>
    //                         <label htmlFor="password">Password:</label>
    //                         <br />
    //                         <input type="password" id="password" name="password" />
    //                     </div>
    //                     <br />
    //                     <div>
    //                         <button type="button">Sign in with Google</button>
    //                         <button type="button">Sign in with Instagram</button>
    //                     </div>
    //                     <br />
    //                     <div>
    //                         <button type="submit">Login</button>
    //                     </div>
    //                 </form>
       

    //             </div>
    //             <div className='grid-element1 right'>
    //                

    //             </div>

    //         </div>

    //     </section>
 */