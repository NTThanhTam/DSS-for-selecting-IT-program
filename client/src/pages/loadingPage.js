import SyncLoader from "react-spinners/SyncLoader";
import { react, useEffect, useState } from 'react';

const LoadingPage = () => {

    return (

    <div className=" h-lvh flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
        <SyncLoader
            color="#7921C4"
            size={25}
        />  
    </div>
    );
  }
  
  export default LoadingPage