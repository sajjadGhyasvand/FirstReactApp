import {createContext} from 'react';


export const contactContext = createContext({
    loading: false,
    setLoading: () => {},
    contacts: [],
    setContacts: [],
    setFilteredContacts: () => {},
    filteredContacts : [],
    groups:[],
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
})