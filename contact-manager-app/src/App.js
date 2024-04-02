import './App.css';
import React, {useState,useEffect} from "react";
import {Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import {AddContact,EditContact,Contacts,Contact,Navbar,ViewContact} from "./Components";
import {createContact, getAllContacts, getAllGroups,deleteContact} from "./Services/contactService";
import  {confirmAlert} from 'react-confirm-alert';
import {CurrentLine, Cyan, Foreground, Purple, Yellow} from "./Helpers/colors";

import {contactContext}  from "./Context/contactContext";
import data from "bootstrap/js/src/dom/data";

const App = () => {
    const [loading,setLoading] = useState(false);
    const [contacts,setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups,setGroups] = useState([]);
    const [contact, setContact] = useState({});
    const [contactQuery, setContactQuery] = useState({ text: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
   /* useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [forceRender]);*/
    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            setLoading((prevLoading) => !prevLoading);
            const { status,data } = await createContact(contact);
            /*
            * Note
            * 1-
            * */
            if (status === 201) {
                const allContacts = [... contacts, data];

                setContacts(allContacts);
                setFilteredContacts(allContacts);

                setContact({});
                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading);
        }
    };
    const onContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const confirmِDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CurrentLine,
                            border: `1px solid ${Purple}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
                        <p style={{ color: Foreground }}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{ backgroundColor: Purple }}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{ backgroundColor: Comment }}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (contactId) => {
        const allContacts = [...contacts];
        try {
            /*
            * way 4 : Delete State Before Server REquest
            * */
            //contact Copy
            const updatedContact = contacts.filter(c => c.id !== contactId);
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

            //sending Delete Request To Server
            const {status} = await deleteContact(contactId);
            if (status !== 200) {
                setContacts(allContacts);
                setFilteredContacts(allContacts);
            }
        } catch (err) {
            console.log(err.message);
            setContacts(allContacts);
            setFilteredContacts(allContacts);
        }
    };
    const contactSearch = (event) => {
        setContactQuery({ ...contactQuery, text: event.target.value });
        const allContacts = contacts.filter((contact) => {
            return contact.fullname
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });

        setFilteredContacts(allContacts);
    };
  return (
      <contactContext.Provider value={{
          loading,
          setLoading,
          contact,
          setContact,
          setContacts,
          contacts,
          filteredContacts,
          setFilteredContacts,
          groups,
          onContactChange,
          deleteContact:confirmِDelete,
          createContact:createContactForm,
          contactSearch,
          contactQuery,

      }}>
          <div className="App">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Navigate to="/contacts"/>}/>
                  <Route path="/contacts"
                         element={<Contacts/>}/>
                  <Route path="/contact/:contactId" element={<Contact/>}/>
                  <Route
                      path="/contacts/add"
                      element={
                          <AddContact />
                      }/><Route path="/contacts/:contactId" element={<ViewContact/>}/>
                  <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
              </Routes>

          </div>
      </contactContext.Provider>
  );
}

export default App;
