// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from './authStore'; // Import zustand store

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
 });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Password validation
  const validatePassword = (password: string): string | null => {
    if (!password) return 'The password field is empty.';
    if (typeof password !== 'string') return 'Password must be a string.';
    if (password.length < 6) return 'The password should exceed 5 characters.';
    if (password.length > 14) return 'The password should not exceed 14 characters.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    try {
      console.log(formData); // Check form data before sending
      const response = await axios.post(
        'https://backend-herbal.onrender.com/user/login',
        formData, {
          withCredentials: true, // Allows cookie handling
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log(response.data); // Check backend response structure
      let res = response.data;
      setAuthData(res.jwtTokens, res.roleToken, res.refreshToken, formData);
      navigate('/');
    } catch (err) {
      if (err.response) {
        const { message, statusCode } = err.response.data;
        setError(message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please check your internet connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Ensure the component does not crash and still returns JSX even in error scenarios
  return (
    <div>
      {/* Error display */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

       

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-white rounded-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
