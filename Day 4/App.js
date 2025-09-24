import { useState } from 'react';
import './App.css';

function App() {

  const [formData , setFormData] = useState({
    name:'',
    email:'',
    country:'',
    bio:'',
    agreToTerms:false});

  const [errors,setErrors] = useState({});
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

  }
    const handleInputChange = (event) => {
      const {name , value} = event.target;  
      setFormData( prevFormData => ({
        ...prevFormData,
        [name]: value
      }))
     if(name === 'email'){
        if(value && !validateEmail(value)){
          setErrors( prevErrors => ({
            ...prevErrors,
            email: 'Please enter a valid email address'
          }))
        } else {
          setErrors( prevErrors => 
          {
            const newErrors = {...prevErrors};
            delete newErrors.email;
            return newErrors;
          }
          );
        }
      }
    }
  const validateForm = () => {
      const newErrors = {};
      if(!formData.name.trim()){
        newErrors.name = 'Name is required';
      }
      if(!formData.email.trim()){
        newErrors.email = 'Email is required';
      } else if(!validateEmail(formData.email)){
        newErrors.email = 'Please enter a valid email address';
      }
      if(!formData.country){
        newErrors.country = 'Please select a country';
      }
      if(formData.bio.length > 500){
        newErrors.bio = 'Bio cannot exceed 500 characters';
      }
      if(!formData.agreeToTerms){
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }     
      return newErrors;
    } 
    const handleSubmit = (event) => {
      event.preventDefault();
      const formErrors = validateForm();

      if(Object.keys(formErrors).length >0){
        setErrors(formErrors);
        return;
      }

      setErrors({});
      console.log('Form Submitted : ', formData);
      resetForm();
    }

    const resetForm = ()=> {
      setFormData({
        name:'',
        email:'',
        country:'',
        bio:'',
        agreToTerms:false
      });
      setErrors({});
    }
  return (
    <div className="App">
      <h1>Personal Info Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={formData.name}
            name='name'
            onChange={handleInputChange}/>
            {errors.name && <span className='error-message'>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email?'error':''}/>
            {errors.email && <span className='error-message'>{errors.email}</span>}
          </div>
        <div>
          <label htmlFor='country'>Country:</label>
          <select
            id='country'
            name='country'
            value={formData.country}
            onChange={handleInputChange}>
              <option value=''>--Select Country--</option>
              <option value='india'>India</option>
              <option value='usa'>USA</option>
              <option value='uk'>UK</option>
              <option value='australia'>Australia</option>
          </select>
          {errors.country && <span className='error-message'>{errors.country}</span>}
        </div>
      <div>
          <label htmlFor='bio'>Tell us about yourself:</label>
          <textarea
            id='bio'
            name='bio'
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            placeholder='Share a bried bio about yourself'/>
            {errors.bio && <span className='error-message'>{errors.bio}</span>}
            <small className={`character-count ${formData.bio.length >450? 'warning':''}`}>{formData.bio.length}/500</small>
      </div>
      <div>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              name='agreeToTerms'
              checked={formData.agreeToTerms}
              onChange={(e) => 
                setFormData( prevFormData => ({
                  ...prevFormData,
                  agreeToTerms: e.target.checked
                }))
              }/>
              I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && <span className='error-message'>{errors.agreeToTerms}</span>}
      </div>
      <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
}
export default App;
