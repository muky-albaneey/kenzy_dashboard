import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from './path-to-auth-store'; // Adjust the import path
import jwt_decode from 'jwt-decode';

type DecodedToken = {
  sub: string; // Assuming the token has the userId under the "sub" claim
  iat?: number;
  exp?: number;
};

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    image: null, // Added image field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<null | string>(null);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the JWT token from Zustand
  const jwtToken = useAuthStore((state) => state.jwtToken);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0], // Store the selected file for image
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ensure the JWT token is available and decode it
      if (!jwtToken) {
        throw new Error('User is not authenticated');
      }

      // Decode the JWT to get the userId
      const decodedToken: DecodedToken = jwt_decode(jwtToken);
      const userId = decodedToken.sub; // Assuming "sub" contains the userId

      if (!userId) {
        throw new Error('Invalid token. User ID not found.');
      }

      // Prepare form data for submission
      const data = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]);
        }
      }
      data.append('userId', userId); // Append the userId to the form data

      // Send data to the backend
      const response = await axios.post('https://backend-herbal.onrender.com/products', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product created successfully:', response.data);
      setSubmissionStatus('success');
    } catch (err) {
      setError(err.message);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Effect to handle side effects based on submission status
  useEffect(() => {
    if (submissionStatus === 'success') {
      console.log('Form submitted successfully');
      // You can use `window.location` or `react-router` to redirect
    }

    if (submissionStatus === 'error') {
      console.error('Form submission error:', error);
    }
  }, [submissionStatus, error]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {submissionStatus === 'success' && (
          <div className="mt-4 text-green-600">Product created successfully!</div>
        )}
        {submissionStatus === 'error' && (
          <div className="mt-4 text-red-600">Submission error: {error}</div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
