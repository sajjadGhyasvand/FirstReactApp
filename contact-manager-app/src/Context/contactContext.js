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
    contactQuery: {},
    groups:[],
    onContactChange: () => {},
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
})