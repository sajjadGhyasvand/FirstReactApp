import { useEffect, useState, useContext } from "react";
import  {contactContext} from "../../Context/contactContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getContact, updateContact} from "../../Services/contactService";
import { Spinner } from "../";
import { Comment, Orange, Purple } from "../../Helpers/colors";
import {contactSchema} from "../../Validations/contactValidation";
import {Formik,Form,Field,ErrorMessage} from "formik";

const EditContact = () => {
    const { contactId } = useParams();
    const {loading,setLoading,groups,contacts,setContacts,setFilteredContacts} = useContext(contactContext);
    const navigate = useNavigate();
    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    const submitForm = async (values) => {

        try {
            setLoading(true);
            const { data, status } = await updateContact(values, contactId);

            if (status === 200) {
                setLoading(false);

                const allContacts = [... contacts];
                const contactIndex = allContacts.findIndex((c) => c.id === contactId);
                allContacts[contactIndex] = {... data};
                setFilteredContacts(allContacts);
                setContacts(allContacts);
                navigate("/contacts");
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: Orange }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: "orange" }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        initialValues={contact}
                                        validationSchema={contactSchema}
                                        onSubmit= {(values) => {
                                            submitForm(values);
                                        }}>
                                        <Form >
                                            <div className="mb-2">
                                                <Field
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                />
                                                <ErrorMessage name="fullname" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="photo"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="آدرس تصویر"
                                                />
                                                <ErrorMessage name="photo" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="شماره موبایل"
                                                />
                                                <ErrorMessage name="mobile" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="آدرس ایمیل"
                                                />
                                                <ErrorMessage name="email" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="شغل"
                                                />
                                                <ErrorMessage name="job" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="group"
                                                    as="select"
                                                    className="form-control"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.length > 0 &&
                                                        groups.map((group) => (
                                                            <option key={group.id} value={group.id}>
                                                                {group.name}
                                                            </option>
                                                        ))}
                                                </Field>
                                                <ErrorMessage  name="group" render={(msg) => (
                                                    <div className='text-danger'>{msg}</div>
                                                )} />
                                            </div>
                                            <div className="mx-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{backgroundColor: Purple}}
                                                    value="ویرایش مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{backgroundColor: Comment}}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${Purple}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../Assets/man-taking-note.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;
