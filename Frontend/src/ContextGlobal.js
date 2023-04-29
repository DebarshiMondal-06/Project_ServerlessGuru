/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


const createGlobalContext = createContext();


const ContextGlobal = ({ children }) => {
  const [watch, setWatch] = useState([]);
  const [loader, setLoader] = useState(false);

  // replace with your endpoint......
  let api_url = "https://zfhjyoalie.execute-api.us-west-2.amazonaws.com/DEV";
  
  const get_all_watches = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${api_url}/get_all`);
      const { Items } = data.result;
      if (Items) setWatch(Items);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    get_all_watches();
  }, []);



  return <createGlobalContext.Provider value={{
    watch,
    loader
  }}>
    {children}
  </createGlobalContext.Provider>
}


export { ContextGlobal, createGlobalContext };
