import {Purple, Comment} from '../../Helpers/colors'
import {useContext} from "react";
import {contactContext} from "../../Context/contactContext";
const SearchContact = ({query, search}) =>{
    const {contactSearch} = useContext(contactContext);
    return (

    <div className="input-group mx-2 w-75" dir="ltr">
        <span className="input-group-text" id="basic-addom1" style={{backgroundColor: Purple}}>
            <i className="fas fa-search"></i>
        </span>
        <input  onChange={event => contactSearch(event.target.value)} type="text" dir="rtl" style={{ borderColor: Purple}}
               className="form-control"
               placeholder="جستجوی مخاطب" aria-label="search" aria-describedby="basic-addon1"/>
    </div>
)
}
export default SearchContact;