import React,{useState, useEffect} from 'react';
import "./SignUp.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link, useNavigate} from 'react-router-dom';

import logo from '../../../src/assets/images/ai-trading-high-resolution-logo.png'

const SignUp = () => {
        const navigate = useNavigate();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const [isButtonDisabled, setIsButtonDisabled] = useState(true);
        const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
    
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        // useEffect(() => {
        //     if (email && password.length >= 8 && password === confirmPassword && isCheckboxChecked) {
        //       setIsButtonDisabled(false);
        //     } else {
        //       setIsButtonDisabled(true);
        //     }
        //   }, [email, password, confirmPassword, , isCheckboxChecked]);

        const handleEmailChange = (e) => {
            setEmail(e.target.value);
        };

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };
        
        const handleConfirmPasswordChange = (e) => {
            setConfirmPassword(e.target.value);
        };
        const handleCheckboxChange = (e) => {
            setIsCheckboxChecked(e.target.checked);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if (!email) {
              setErrorMessage('Email is required.');
            } else if (password.length < 8) {
              setErrorMessage('Password must be at least 8 characters long.');
            } else if (password !== confirmPassword) {
              setErrorMessage('Passwords do not match.');
            }else if (!isCheckboxChecked) {
                setErrorMessage('You must accept the terms and conditions.');
              } 
            else {
              setErrorMessage('');
              // Proceed with form submission
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
                    <h3>Sign up to AI Trader</h3>
                    <div><p>Create an account to proceed</p></div>
                </div>    
            </header>
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
            <div className='FormArea'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="input-container">
                        <input type="email" id="email" name="email" required onChange={handleEmailChange} value={email} placeholder=" " />
                        <label htmlFor="email">Email Address*</label>
                    </div>
                            
                    <div className="input-container">
                        <input type={showPassword ? "text" : "password"} id="password1" name="password1" required value={password} onChange={handlePasswordChange} placeholder=" "/>
                        <label htmlFor="password1">Password*</label>
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

                    <div className="input-container">
                        <input type={showPassword ? "text" : "password"} id="password2" name="password2" required value={confirmPassword}  onChange={handleConfirmPasswordChange} placeholder=" "/>
                        <label htmlFor="password2">Confirm Password*</label>
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
                    
                    
                    <div className="checkbox-container">
                        <input type="checkbox" required checked={isCheckboxChecked} onChange={handleCheckboxChange}/>
                        <div><p>I accept the <a className='forgot-password-link' href=''>terms and conditions</a></p></div>

                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className='Login-Button-Container'>
                        <button className='Login-Button' onSubmit={handleSubmit} >Continue</button>
                    </div>
                    <div className='Login-Button-Container'>
                        <button type="button" className='Login-Button'><i className="google-icon fab fa-google"></i>Sign up with Google</button>
                
                    </div>
                </div>
          
                
                    
                        
                    <p>Already have an account? <Link to='/signin' className='forgot-password-link'>Log in</Link></p>      
                         
            </form>

            </div>
        
        </section>

    </main>

    </>
  );
};

export default SignUp;



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