// import React, { useState } from 'react';
// import axios from 'axios';
// import { Product } from '../../types/product'; // Adjust import path based on your project structure
// import { Link } from 'react-router-dom';

// const TableOne = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   React.useEffect(() => {
//     // const fetchProducts = async () => {
//     //   try {
//     //     const response = await axios.get('https://backend-herbal.onrender.com/products/all', {
//     //       withCredentials: true,
//     //     });
//     //     setProducts(response.data);
//     //     console.log(response.data)
//     //   } catch (err) {
//     //     setError('Error fetching products');
//     //     console.error(err);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//     const fetchProducts = async () => {
//   try {
//     const response = await axios.get('https://backend-herbal.onrender.com/products/all', {
//       withCredentials: true,
//       headers: {
//         'Cache-Control': 'no-cache', // Prevent caching of the response
//       },
//     });
//     setProducts(response.data);
//   } catch (err) {
//     setError('Error fetching products');
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };


//     fetchProducts();
//   }, []);

//   if (loading) return <div>Loading products...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//         Products
//       </h4>

//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Image</h5>
//           </div>
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Price</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
//           </div>
//           {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Description</h5>
//           </div> */}
//         </div>

//         {products.map((product, key) => (
//           <Link to={`/${product.id}/product`}
//             className={`grid grid-cols-3 sm:grid-cols-5 ${
//               key === products.length - 1
//                 ? ''
//                 : 'border-b border-stroke dark:border-strokedark'
//             }`}
//             key={product.id}
//           >
//             {/* {key} */}
//             <h1>{product.id}</h1>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               {product.product_image.base64 ? (
//                 <img
//                   src={`data:image/${product.product_image.ext};base64,${product.product_image.base64}`}
//                   alt={product.name}
//                   className="w-16 h-16 object-cover"
//                 />
//               ) : (
//                 <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
//                   No Image
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{product.name}</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">${product.price}</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{product.quantity}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{product.category}</p>
//             </div>

//             {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{product.description}</p>
//             </div> */}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableOne;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../types/product'; // Adjust import path based on your project structure
import { Link } from 'react-router-dom';

const TableOne = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-herbal.onrender.com/products/all', {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache', // Prevent caching of the response
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  // Check if there are no products available
  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Products
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Image</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Price</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
          </div>
        </div>

        {products.map((product, key) => (
          <Link
            to={`/${product.id}/product`}
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === products.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={product.id}
          >
            <h1>{product.id}</h1>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {product.product_image?.base64 ? (
                <img
                  src={`data:image/${product.product_image.ext};base64,${product.product_image.base64}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{product.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${product.price}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{product.quantity}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
