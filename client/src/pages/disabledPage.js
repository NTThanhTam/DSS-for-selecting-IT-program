import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisabledPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🚫 Page Disabled
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          For some reason, this page is currently disabled. Sorry for the inconvenience.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500"
        >
          Go to Homepage
        </button>
      </div>
    </section>
  );
};

export default DisabledPage;
