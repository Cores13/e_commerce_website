import React, {createContext, useState} from 'react';

export const GlobalState = React.createContext({});

export const DataProvider: React.FC = ({children}) => {
    return (
        <GlobalState.Provider value={'Value'}>
            {children}
        </GlobalState.Provider>
    )
}