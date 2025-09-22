import {createContext, useState} from 'react';

export const AppContext=createContext();

export const AppContextProvider=(props)=>{

    const backend_url=import.meta.env.VITE_BACKEND_URL;
    const [isLogedIn,setIsLoggedIn]=useState(false);
    const [userData,setUserData]=useState(false);
    

    const value={
        backend_url,
        isLogedIn,
        setIsLoggedIn,
        userData,
        setUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}