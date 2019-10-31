import React            from "react"
import {connect}        from "react-redux"
import {fetchStream}    from "./../../actions"
import flv              from "flv.js"

class StreamShow extends React.Component {

    constructor(props){
        super(props)
        this.videoRef = React.createRef()
    }

    componentDidMount = () => {
        const {stream_id} = this.props.match.params;
        this.props.fetchStream(stream_id)
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer = () => {
        if(this.player || !this.props.stream){
            return false;
        }
        const {stream_id} = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${stream_id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render = () => {
        if(!this.props.stream)
            return <div>Loading...</div>
        const {title, description} = this.props.stream
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
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

export default connect(mapStateToProps, {fetchStream})(StreamShow)