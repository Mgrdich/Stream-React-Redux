import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Joi from "joi-browser";
import createValidator from "../../Validate/myValidation";


class StreamForm extends Component {
    renderinput = formProps => {
        // console.log(formProps.meta);
        const { input, label, meta } = formProps;
        return (
            <div className="form-group m-2">
                <label>{label}</label>
                <input
                    {...input}
                    type="text"
                    className="form-control"
                    id={label}
                    placeholder={label}
                    autoComplete="off"
                />
                {meta.touched &&
                meta.error && ( //just like mosh but check the differnce between boolean object true and falsy something
                    <span className="badge badge-danger  d-inline-block">
              {meta.error}
            </span>
                )}
            </div>
        );
    };

    onSumbit = formValues => {
        this.props.onSubmit(formValues); //(this is for the redux form props)

    };
    render() {
      // console.log(this.props);
        return (

            <>
                <form
                    onSubmit={this.props.handleSubmit(this.onSumbit)}
                    className="col-5 form-group"
                >
                    <Field name="title" label="Title" component={this.renderinput}/>
                    <Field
                        name="description"
                        label="description"
                        component={this.renderinput}
                    />
                    <button type="submit" className="btn btn-dark btn-sm m-2">
                        Submit
                    </button>
                </form>
            </>
        );
    }
}

const schema = {
    title: Joi.string()
        .required()
        .min(5)
        .label("Title")
        .max(10),
    description: Joi.string()
        .required()
        .min(5)
        .label("Descrption")
};

export default reduxForm({
    form: "streamForm",
    validate: createValidator(schema)
})(StreamForm);

