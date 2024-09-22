import React, { useState, useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const ECommerce: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  
  const [productCount, setProductCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signup');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await fetch('https://backend-herbal.onrender.com/products/count');
        if (!response.ok) {
          throw new Error('Failed to fetch product count');
        }
        const data = await response.json();
        console.log(data)
        setProductCount(data);
        console.log(productCount)
      } catch (error) {
        console.error('Error fetching product count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductCount();
  }, []);

  if (!isAuthenticated) return null;
  console.log(productCount)
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total sales" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Product" total={loading ? 'Loading...' : productCount?.toString() || '0'} rate="2.59%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content */}
          </svg>
        </CardDataStats>
      </div>
      {/* Add any additional content like charts */}
    </>
  );
};

export default ECommerce;
