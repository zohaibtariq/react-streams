import React        from "react"
import {connect}    from "react-redux"
import {Link}       from "react-router-dom"
import Modal        from "./../Modal"
import history      from "./../../history"
import {
    fetchStream,
    deleteStream
}                   from "./../../actions"

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.stream_id)
    }

    deleteStream = () => {
        if(this.IsStreamBelongsToUser()){
            const {stream_id} = this.props.match.params
            this.props.deleteStream(stream_id)
        }else // un authorised user deleting stream
            history.push('/')
    }

    IsStreamBelongsToUser = () => {
        return !(!this.props.stream || !(this.props.stream.userId === this.props.currentUserId));
    }

    renderActions = () => {
        return (
            //this <></> and <React.Fragment></React.Fragment> are same
            <React.Fragment>
                <button onClick={() => this.deleteStream()} className="ui negative button" disabled={!this.IsStreamBelongsToUser()}>Delete</button>
                <Link to={`/`} className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderTitle = () => {
        if(!this.props.stream)
            return (<>Delete Stream</>)
        return (<>Delete "{this.props.stream.title}" stream</>)
    }

    renderContent = () => {
        if(!this.props.stream)
            return (<><p><strong>Are you sure you want to delete this stream?</strong></p></>)
        return (
            <>
                <p><strong>Are you sure you want to delete this stream?</strong></p>
                <p>
                    {this.props.stream.title}
                </p>
            </>
        )
    }

    render = () => {
        return (
            <div>
                <Modal
                    title={this.renderTitle()}
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDisMiss={() => history.push('/')}
                />
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

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)