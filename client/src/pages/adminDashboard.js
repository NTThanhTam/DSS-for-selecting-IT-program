import React, { useEffect, useState } from 'react';

import {User, Program, Sidebar} from '../components/dashboard'



const AdminDashboard = () => {

  const [selectedCategory, setSelectedCategory] = useState("user");

  const renderContent = () => {
    switch (selectedCategory) {
      case "user":
        return <User />;
      case "program":
        return <Program />;
      default:
        return <User />;
    }
  };


  return (
    <div className="flex min-h-screen h-auto pt-14 dark:bg-gray-900">
      <Sidebar onSelectCategory={setSelectedCategory} />
      <div className="w-full bg-white dark:bg-gray-900 flex flex-col items-center">{renderContent()}</div>
    </div>
  );

};

export default React.memo(AdminDashboard);