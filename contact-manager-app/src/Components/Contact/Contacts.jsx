import Contact from "./Contact";
import {Pink} from "../../Helpers/colors"
const Contacts = () => {
    return(
        <>
           <section className="container">
               <div className="row">
                   <div className="col">
                       <p className="h3 mt-2">
                           <button className="btn mx-2" style={{backgroundColor:Pink}}>
                               ساخت مخاطب جدید
                               <i className="fas fa-plus-circle mx-2"></i>
                           </button>
                       </p>
                   </div>
               </div>
           </section>
           <section className="container">
                <Contact />
           </section>
        </>
    )
}
export default Contacts;