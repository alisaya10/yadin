import React from 'react';
import FormViewer from '../FormViewer-new';


class FormController extends React.Component {

    state = {

        hoveredIndex: 0,
        headers: {
            name: { type: 'TextInput1', key: 'name', information: { label: "First Name", placeholder: "Name", }, },
            //   family: { type: 'TextInput', key: 'family', information: { label: "Last Name", placeholder: "Family  ", }, },
            //   email: { type: 'TextInput', key: 'email', information: { label: "Work Email", placeholder: "Name", }, },
            //   Phone: { type: 'TextInput', key: 'Phone', information: { label: "Work Phone", placeholder: "Phone Number", }, },
            //   website: { type: 'TextInput', key: 'website', information: { label: "Company Website", placeholder: "Website", }, },
            size: { type: 'SelectInput1', key: 'size', information: { label: "Company size", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            //   country: { type: 'SelectInput', key: 'country', information: { label: "Country", items: [{ title: "USA", value: "maryam" }, { title: "Iran", value: "pouya" }, { title: "United Kingdom", value: "pedram" }, { title: "Togo+", value: "pedram" }], }, },
            //   peyment: { type: 'SelectInput', key: 'peyment', information: { label: "Peyment Volume", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            other: { type: 'TextAreaInput1', key: 'other', information: { label: "Description", placeholder: "Tell us more about your project, needs and timeline." }, },

        }


    }



    render() {

        return (
            <div className="w-100 flexcc" >
                <div className="controllerform-box p-4 w-100">

                    <FormViewer headers={this.state.headers} theme={"white"} />

                    <div className="d-flex justify-content-end">
                        <button className=" controllerform-button">SUBMIT</button>
                    </div>

                </div>
            </div>
        )

    }
}
export default FormController;