import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { decode } from 'jwt-js-decode';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    file: null,
  });
  
  const [status, setStatus] = useState({ submitting: false, error: null, success: false });
  const jwtToken = useAuthStore((state) => state.jwtToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signup');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, you might want to return null or a loading state
  if (!isAuthenticated) return null; 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus({ submitting: true, error: null, success: false });

  //   try {
  //     if (!jwtToken) throw new Error('User not authenticated');
  //     const userId = decode(jwtToken).payload.sub; // Get user ID from token

  //     const data = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => data.append(key, value as string | Blob));
  //     data.append('userId', userId);

  //     await axios.post('https://backend-herbal.onrender.com/products', data, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       withCredentials: true,
  //     });
  //     console.log(userId);
      
  //     for (let [key, value] of data.entries()) {
  //       console.log(`${key}:`, value);
  //     }
  
  //     setStatus({ submitting: false, error: null, success: true });
  //   } catch (err) {
  //     setStatus({ submitting: false, error: err.message, success: false });
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, error: null, success: false });
  
    try {
      if (!jwtToken) throw new Error('User not authenticated');
      const userId = decode(jwtToken).payload.sub; // Get user ID from token
  
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key === 'file' ? 'file' : key, value as string | Blob)); // Use 'file' key for the image
      data.append('userId', userId);
  
      // Log all form data before sending
      // for (let [key, value] of data.entries()) {
      //   console.log(`${key}:`, value);
      // }
  
     const res = await axios.post('https://backend-herbal.onrender.com/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log(res)
      setStatus({ submitting: false, error: null, success: true });
      // navigate('/'); 
    } catch (err) {
      setStatus({ submitting: false, error: err.message, success: false });
    }
  };
  
  useEffect(() => {
    if (status.success) console.log('Product created successfully');
  }, [status.success]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'price', 'quantity', 'category', 'description'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={status.submitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          {status.submitting ? 'Submitting...' : 'Submit'}
        </button>

        {status.success && <div className="mt-4 text-green-600">Product created successfully!</div>}
        {status.error && <div className="mt-4 text-red-600">Error: {status.error}</div>}
      </form>
    </div>
  );
};

export default CreateProduct;
