import _                from "lodash"
import React            from "react"
import {connect}        from "react-redux"
import {fetchStream}    from "./../../actions"
import {editStream}     from "./../../actions"
import StreamForm       from "./StreamForm"
import history from "../../history"

class StreamEdit extends React.Component {

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.stream_id)
    }

	IsStreamBelongsToUser = () => {
		return !(!this.props.stream || !(this.props.stream.userId === this.props.currentUserId));
	}

    onSubmit = (formValues) => {
	    if(this.IsStreamBelongsToUser()){
		    const {stream_id} = this.props.match.params
		    this.props.editStream(stream_id, formValues)
	    }else // un authorised user editing stream
		    history.push('/')
    }

    render = () => {
        if(!this.props.stream)
            return <div>Loading...</div>
        return (
            <div>
	            <h3>Edit Stream "{this.props.stream.title}"</h3>
	            <StreamForm
		            initialValues={_.pick(this.props.stream, 'title', 'description')}
		            onSubmit={this.onSubmit}
		            isValidUser={this.IsStreamBelongsToUser()}
	            >
	            </StreamForm>
            </div>
        )
    }

}
const mapStateToProps = (state, componentProps) => {
    return {
    	stream: state.streams[componentProps.match.params.stream_id],
	    currentUserId: state.auth.userId,
    }
}
export default connect(mapStateToProps,
	{fetchStream,editStream}
	)(StreamEdit)