import Contact from "./Contact";
import {CurrentLine, Pink, Orange} from "../../Helpers/colors";
import  NotFound from "../../Assets/no-found.gif";
import contact from "./Contact";
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {contactContext} from "../../Context/contactContext";

const Contacts = () => {
    const {loading,filteredContacts,deleteContact} = useContext(contactContext);
    return(
        <>
           <section className="container">
               <div className="row">
                   <div className="col">
                       <p className="h3 float-end mt-2">
                           <Link to={"/contacts/add"} className="btn mx-2" style={{backgroundColor:Pink}}>
                               ساخت مخاطب جدید
                               <i className="fas fa-plus-circle mx-2"></i>
                           </Link>
                       </p>
                   </div>
               </div>
           </section>
            {
                loading ? <Spinner /> : (
                    <section className="container row">

                            {filteredContacts.length > 0 ? filteredContacts.map(c => (

                                        <Contact key={c.id} contact={c} deleteContact={() => deleteContact(c.id,c.fullname)}/>

                                    )) :
                                    (
                                        <div className="text-center py-5" style={{backgroundColor: CurrentLine}}>
                                            <p className="h3 " style={{color: Orange}}>
                                                مخاطب یافت نشد
                                            </p>
                                            <img src={NotFound} alt="پیدا نشده" className="w-25"/>
                                        </div>
                                    )
                            }

                    </section>
                )
            }

        </>
    )
}
export default Contacts;