import './App.css';
import React, {useEffect} from "react";
import {Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import {AddContact,EditContact,Contacts,Contact,Navbar,ViewContact} from "./Components";
import {createContact, getAllContacts, getAllGroups,deleteContact} from "./Services/contactService";
import  {confirmAlert} from 'react-confirm-alert';
import {CurrentLine, Cyan, Foreground, Purple, Yellow} from "./Helpers/colors";
import {contactContext}  from "./Context/contactContext";
import _ from 'lodash';
import {useImmer} from "use-immer";
import {ToastContainer,toast} from "react-toastify";

const App = () => {
    const [loading,setLoading] = useImmer(false);
    const [contacts,setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups,setGroups] = useImmer([]);
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
    const createContactForm = async (values) => {
        try {
            setLoading((prevLoading) => !prevLoading);

            const { status,data } = await createContact(values);

            if (status === 201) {
                toast.success("مخاطب با موفقیت ساخته شد");
                const allContacts = [... contacts, data];

                setContacts(allContacts);
                setFilteredContacts(allContacts);

                setContacts((draft) => {draft.push(data)});
                setFilteredContacts((draft) => {draft.push(data)});

                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            //console.log(err.inner);
            setLoading((prevLoading) => !prevLoading);
        }
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
        const contactsBackup = [...contacts];

        try {

            const updatedContact = contacts.filter(c => c.id !== contactId);
            setContacts(updatedContact);
            setFilteredContacts(updatedContact);

           setContacts(draft => contacts.filter(c=>c.id !== contactId));
           setFilteredContacts(draft => contacts.filter(c=>c.id !== contactId));
            const {status} = await deleteContact(contactId);
            toast.error("مخاطب با موفقیت حذف شد");
            if (status !== 200) {
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
            }
        } catch (err) {
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
        }
    };
    let filterTimeOut;
    const contactSearch = _.debounce(query => {
        if (!query) return setFilteredContacts([...contacts]);

setFilteredContacts(draft => draft.filter(c => c.fullname.toLowerCase().includes(query.toLowerCase())))
    },1000);
  return (
      <contactContext.Provider value={{
          loading,
          setLoading,
          setContacts,
          contacts,
          filteredContacts,
          setFilteredContacts,
          groups,
          deleteContact:confirmِDelete,
          createContact:createContactForm,
          contactSearch,
      }}>
          <div className="App">
              <ToastContainer position="top-right" rtl={true} theme="colored"/>
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
