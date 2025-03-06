import React,{useState, useEffect} from 'react';
import "./SignUp.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import logo from '../assets/images/ai-trading-high-resolution-logo.png'

const SignUp = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const [isButtonDisabled, setIsButtonDisabled] = useState(true);
        const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

        useEffect(() => {
            if (email && password.length >= 8 && password === confirmPassword && isCheckboxChecked) {
              setIsButtonDisabled(false);
            } else {
              setIsButtonDisabled(true);
            }
          }, [email, password, confirmPassword, , isCheckboxChecked]);

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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='FormArea'>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="input-container">
                        <input type="email" id="email" name="email" required onChange={handleEmailChange} value={email} />
                        <label htmlFor="email">Email Address*</label>
                    </div>
                            
                    <div className="input-container">
                        <input type="password" id="password1" name="password1" required value={password} onChange={handlePasswordChange}/>
                        <label htmlFor="password">Password*</label>
                    </div>

                    <div className="input-container">
                        <input type="password" id="password2" name="password2" required value={confirmPassword}  onChange={handleConfirmPasswordChange}/>
                        <label htmlFor="password">Confirm Password*</label>
                    </div>

                    
                    <div className="checkbox-container">
                        <input type="checkbox" required checked={isCheckboxChecked} onChange={handleCheckboxChange}/>
                        <div><p>I accept the <a href=''>terms and conditions</a></p></div>

                    </div>
                </div>
          
                
                    <div className='Login-Button-Container'>
                        <button type="submit" className='Login-Button'  disabled={isButtonDisabled}>Continue</button>
                    </div>
                        
                    <p>Already have an account? <a href='' className='forgot-password-link'>Log in</a></p>
                
                       
                         
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