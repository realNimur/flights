import { createContext, useReducer } from 'react';
import React from 'react';
import { reducer } from './reducer';

export const FlightsContext = createContext();

const initialState = {
    sortTimeDuration: false,
    sortPriceUp: false,
    sortPriceDown: true,
    filterOneTransfer: false,
    filterNoTransfer: false,
    filterPriceFrom: 0,
    filterPriceTo: 1000000,
    filterListCompany: [],
    filterSelectCompany: [],
    filteredArray: [],
};

export const ContextProvider = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, initialState);
    value.sortTime = () => {
        dispatch({ type: 'SORT_TIME' });
    };
    value.sortPriceUpFunction = () => {
        dispatch({ type: 'SORT_PRICE_UP' });
    };
    value.sortPriceDownFunction = () => {
        dispatch({ type: 'SORT_PRICE_DOWN' });
    };
    value.filterListNoTransfer = () => {
        dispatch({ type: 'FILTER_NO_TRANSFER' });
    };
    value.filterListOneTransfer = () => {
        dispatch({ type: 'FILTER_ONE_TRANSFER' });
    };
    value.filterPriceFromFunction = (event) => {
        dispatch({ type: 'FILTER_PRICE_FROM', payload: { event } });
    };
    value.filterPriceToFunction = (event) => {
        dispatch({ type: 'FILTER_PRICE_TO', payload: { event } });
    };
    value.setFilterListCompany = (array) => {
        dispatch({ type: 'SET_FILTER_LIST_COMPANY', payload: { array } });
    };
    value.setFilterCompanyBy = (company) => {
        dispatch({ type: 'SET_FILTER_COMPANY', payload: { company } });
    };
    value.setFilteredArray = (array) => {
        dispatch({ type: 'SET_FILTERED_ARRAY', payload: { array } });
    };
    return (
        <FlightsContext.Provider value={value}>
            {children}
        </FlightsContext.Provider>
    );
};
