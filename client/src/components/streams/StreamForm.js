import React    from "react"
import {
	Field,
	reduxForm
}               from "redux-form"

class StreamForm extends React.Component {

	renderError = ({error, touched}) => {
		if(error && touched)
			return (
				<div className={`ui error message`}>
					<div className={`header`}>{error}</div>
				</div>
			)
	}

	renderInput = ({input, label, meta, disabled}) => {
		const className = `field ${meta.error && meta.touched?'error':''}`
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete={`off`} disabled={disabled}/>
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues)
	}

	render(){
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className={`ui form error`}>
				<Field name={`title`} component={this.renderInput} label={`Enter label`} disabled={!this.props.isValidUser}></Field>
				<Field name={`description`} component={this.renderInput} label={`Enter description`} disabled={!this.props.isValidUser}></Field>
				<button className={`ui button primary`} disabled={!this.props.isValidUser}>Submit</button>
			</form>
		)
	}

}
const validate = (formValues) => {
	const errors = {};
	if(!formValues.title)
		errors.title = "You must enter a title"
	if(!formValues.description)
		errors.description = "You must enter a description"
	return errors
}

export default  reduxForm({
	form: 'stream-form',
	validate // validate: validate
})(StreamForm)