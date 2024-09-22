// export default Settings;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';

const Settings = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); 
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
  });

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`https://backend-herbal.onrender.com/products/${id}`);
  //       setProduct(response.data);
  //       setFormData({
  //         name: response.data.name,
  //         price: response.data.price,
  //         quantity: response.data.quantity,
  //         category: response.data.category,
  //         description: response.data.description,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  // const handleFileChange = (event) => {
  //   setImageFile(event.target.files[0]);
  // };

  // const handleUpdateImage = async () => {
  //   if (!imageFile) return;

  //   const formDataImage = new FormData();
  //   formDataImage.append('file', imageFile);

  //   try {
  //     await axios.patch(`https://backend-herbal.onrender.com/products/${id}`, formDataImage);
  //     fetchProductData();
  //   } catch (error) {
  //     console.error('Error updating image:', error);
  //   }
  // };

  // const handleDeleteImage = async () => {
  //   try {
  //     await axios.delete(`https://backend-herbal.onrender.com/products/${id}/image`);
  //     fetchProductData();
  //   } catch (error) {
  //     console.error('Error deleting image:', error);
  //   }
  // };

  // const fetchProductData = async () => {
  //   try {
  //     const response = await axios.get(`https://backend-herbal.onrender.com/products/${id}`);
  //     setProduct(response.data);
  //     setFormData({
  //       name: response.data.name,
  //       price: response.data.price,
  //       quantity: response.data.quantity,
  //       category: response.data.category,
  //       description: response.data.description,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching product data:', error);
  //   }

  // };      

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleUpdateInfo = async () => {
  //   try {
  //     const updatedData = { ...formData };
  //     // Remove any empty fields to avoid sending unnecessary data
  //     Object.keys(updatedData).forEach(key => {
  //       if (updatedData[key] === '') {
  //         delete updatedData[key];
  //       }
  //     });

  //     await axios.patch(`https://backend-herbal.onrender.com/products/${id}`, updatedData);
  //     fetchProductData();
  //   } catch (error) {
  //     console.error('Error updating product info:', error);
  //   }
  // };

  // const handleDeleteProduct = async () => {
  //   try {
  //     await axios.delete(`https://backend-herbal.onrender.com/products/${id}`);
  //     console.log('Product deleted');
  //     // Optionally redirect or show a message
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://backend-herbal.onrender.com/products/${id}`);
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          price: response.data.price,
          quantity: response.data.quantity,
          category: response.data.category,
          description: response.data.description,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [id]); // This will run whenever the `id` changes
  
  // Handle image update
  const handleUpdateImage = async () => {
    if (!imageFile) return;
  
    const formDataImage = new FormData();
    formDataImage.append('file', imageFile);
  
    try {
      await axios.patch(`https://backend-herbal.onrender.com/products/${id}`, formDataImage);
      fetchProductData(); // Re-fetch product after updating the image
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };
  
  // Handle image delete
  const handleDeleteImage = async () => {
    try {
      await axios.delete(`https://backend-herbal.onrender.com/products/${id}/image`);
      fetchProductData(); // Re-fetch product after deleting the image
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  // Handle product info update
  const handleUpdateInfo = async () => {
    try {
      const updatedData = { ...formData };
      // Remove empty fields
      Object.keys(updatedData).forEach(key => {
        if (updatedData[key] === '') {
          delete updatedData[key];
        }
      });
  
      await axios.patch(`https://backend-herbal.onrender.com/products/${id}`, updatedData);
      fetchProductData(); // Re-fetch product after updating product info
    } catch (error) {
      console.error('Error updating product info:', error);
    }
  };
  
  // Handle product delete
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://backend-herbal.onrender.com/products/${id}`);
      console.log('Product deleted');
      // Optionally redirect or show a message after deletion
      // e.g., navigate to another page or clear the state
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  // Re-fetch product details function
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`https://backend-herbal.onrender.com/products/${id}`);
      setProduct(response.data);
      setFormData({
        name: response.data.name,
        price: response.data.price,
        quantity: response.data.quantity,
        category: response.data.category,
        description: response.data.description,
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Product Information
                </h3>
              </div>
              <div className="p-7">
                {product ? (
                  <div>
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <img
                      src={`data:image/png;base64,${product.product_image?.base64}`}
                      alt={product.name}
                      className="my-4 rounded h-32 w-auto"
                    />
                    <form>
                      <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                      </div>
                      <div>
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                      </div>
                      <div>
                        <label>Category:</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} />
                      </div>
                      <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                      </div>
                      <button type="button" onClick={handleUpdateInfo} className="mt-2 text-sm text-primary">
                        Update Product Info
                      </button>
                    </form>

                    <div className="mt-4">
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                      {product.product_image ? (
                        <>
                          <button onClick={handleUpdateImage} className="ml-2 text-sm text-primary">
                            Update Image
                          </button>
                          <button onClick={handleDeleteImage} className="ml-2 text-sm text-red-600">
                            Delete Image
                          </button>
                        </>
                      ) : (
                        <button onClick={handleUpdateImage} className="ml-2 text-sm text-primary">
                          Upload Image
                        </button>
                      )}
                    </div>
                    <button onClick={handleDeleteProduct} className="mt-4 text-sm text-red-600">
                      Delete Product
                    </button>
                  </div>
                ) : (
                  <p>Loading product information...</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
