import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

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

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'https://backend-herbal.onrender.com/user/login',
        { email: formData.email, password: formData.password }, // Only sending email and password
        {
          withCredentials: true, // Ensures cookies are included
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const res = response.data;
      setAuthData(res.jwtTokens, res.roleToken, res.refreshToken, formData);
      navigate('/');
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        setError(message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please check your internet connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
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
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
