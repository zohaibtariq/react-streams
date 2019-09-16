import React from "react"
class GoogleAuth extends React.Component{
    state = {'isSignedIn': null}
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1041107456305-9vl0bpggo9kdaqsll4s68vsha3ivdvde.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.auth.isSignedIn.listen(this.onAuthChange)
                if(this.auth.isSignedIn.get() === false)
                    this.onSignInClick();
                else
                    this.onAuthChange()
            })
        })
    }
    onAuthChange = () => {
        this.setState({'isSignedIn': this.auth.isSignedIn.get()})
    }
    onSignInClick = () => {
        this.auth.signIn();
    }
    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton(){
        if(this.state.isSignedIn === null)
            return null
        else if(this.state.isSignedIn === true)
            return (
                <button onClick={this.onSignOutClick} className={`ui red google button`}>
                    <i className={`google icon`}></i>
                    Sign Out
                </button>
                )
        else
            return (
                <button onClick={this.onSignInClick} className={`ui red google button`}>
                    <i className={`google icon`}></i>
                    Sign In
                </button>
            )

    }
    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}
export default GoogleAuth