import {createContext} from 'react';


export const contactContext = createContext({
    loading: false,
    setLoading: () => {},
    contact : {},
    setContact: () => {},
    contacts: [],
    setContacts: [],
    setFilteredContacts: () => {},
    filteredContacts : [],
    groups:[],
    //errors:[],
    onContactChange: () => {},
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
})