import React from "react";

const Sidebar = ({ onSelectCategory }) => {
  return (
    <div className="w-1/7 flex flex-col flex-grow bg-gray-100 dark:bg-gray-800 p-6">
      <h2 className="text-2xl text-black dark:text-white font-semibold mb-6 text-center">Dashboard</h2>
      <ul className="space-y-4">
        <li
          onClick={() => onSelectCategory("user")}
          className="flex flex-row justify-center items-center cursor-pointer dark:hover:bg-purple-600 rounded py-5 px-2 space-x-2"
        >
          {/* <img src='./profile.png' alt='profile icon' className='w-10 h-10 '/> */}
          <div className='hidden md:block text-black dark:text-white'>Users</div>
        </li>
        <li
          onClick={() => onSelectCategory("program")}
          className="flex flex-row justify-center items-center cursor-pointer dark:hover:bg-purple-600 rounded py-5 px-2 space-x-2"
        >
          {/* <img src='./buying.png' alt='profile icon' className='w-10 h-10'/>  */}
          <div className='hidden md:block text-black dark:text-white'>Programs</div>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);