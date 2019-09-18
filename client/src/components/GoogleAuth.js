import React                from "react"
import {connect}            from "react-redux"
import {signIn, signOut}    from "./../actions"
class GoogleAuth extends React.Component{
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1041107456305-9vl0bpggo9kdaqsll4s68vsha3ivdvde.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.auth.isSignedIn.listen(this.onAuthChange)
                this.onAuthChange(this.auth.isSignedIn.get())
            })
        })
    }
    // update redux store upon change status of auth
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) //if: if signed in (i.e: true) then update signedIn key on redux store as true
            this.props.signIn(this.auth.currentUser.get().getId())
        else //else: if not signed in (i.e: false) then update signedIn key on redux store as false
            this.props.signOut()
    }
    // actual call to sign in to google
    signMeIn = () => this.auth.signIn()
    // actual call to sign out to google
    signMeOut = () => this.auth.signOut()
    renderAuthButton(){
        if(this.props.isSignedIn === null)
            return null
        else if(this.props.isSignedIn === true)
            return (
                <button onClick={this.signMeOut} className={`ui red google button`}>
                    <i className={`google icon`}></i>
                    Sign Out
                </button>
            )
        else
            return (
                <button onClick={this.signMeIn} className={`ui red google button`}>
                    <i className={`google icon`}></i>
                    Sign In
                </button>
            )
    }
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)