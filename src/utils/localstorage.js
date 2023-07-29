import { STORAGES } from "../res/ConstVariable";
import {setAsyncStorage} from './asyncStorage'
import apiService from "../redux/services";

 
setUserData = async(success) => {
    const data = success ? success.data : {};
    console.log("data", data);
    const { first_name, last_name, phone,image, id } = data;
    const { email, password } = this.state;

    let user = {
      id,
      first_name,
      last_name,
      email,
      phone,
      token: success.token,
      errorTo:""
    };
    if(image)
    user.image=image
    apiService.setAuthorizationToken(success.token);
    setAsyncStorage(STORAGES.USER, JSON.stringify(user))
      .then(res => {
        return true
      })
      .catch(e => {
      
        this.setState({ loading: false });
      });
  };