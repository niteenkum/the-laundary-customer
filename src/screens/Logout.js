import React from 'react'

import { removeAsyncStorage  } from "../utils/asyncStorage";
import { STORAGES } from "../res/ConstVariable";
 
import { connect } from "react-redux";
import { Loader } from '../components/loader'
import { logoutUser} from '../redux/actions/auth.action'
 class Logout extends React.Component {
    onLogout = () => {
      removeAsyncStorage(STORAGES.USER)
            .then(() => {
                this.props.logoutUser()
                this.props.navigation.navigate("Auth");
            })
            .catch(() => {
                console.log("Error");
            });
    }
componentDidMount(){
    const {User}=this.props
    if(User && User.id)
     this.onLogout()
     else 
     this.props.navigation.navigate("Auth");

}
    render() {
        return (<Loader loader={true} />)
    }

}
const reduxState = ({UserData}) => {
    const {User}=UserData
    return {
        User
    };
  };
  export default connect(
    reduxState,
    { logoutUser
         }
  )(Logout);