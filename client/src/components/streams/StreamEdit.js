import _ from "lodash"
import React        from "react"
import {connect}    from "react-redux"
import {fetchStream} from "./../../actions"
import {editStream} from "./../../actions"
import StreamForm from "./StreamForm"

class StreamEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.stream_id)
    }

    onSubmit = (formValues) => {
		console.log('From stream edit')
		console.log(formValues)
	    this.props.editStream(this.props.match.params.stream_id, formValues)
    }

    render = () => {
        if(!this.props.stream)
            return <div>Loading...</div>
        return (
            <div>
	            <h3>Edit a Stream</h3>
	            <StreamForm
		            initialValues={_.pick(this.props.stream, 'title', 'description')}
		            onSubmit={this.onSubmit}
	            >
	            </StreamForm>
            </div>
        )
    }

}
const mapStateToProps = (state, componentProps) => {
    return {stream:state.streams[componentProps.match.params.stream_id]}
}
export default connect(mapStateToProps,
	{fetchStream,editStream}
	)(StreamEdit)