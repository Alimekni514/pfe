import React, { useContext } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import AdminContext from '../contexts/AdminContext'
import UserContext from "../contexts/UserContext";
const SignInComponent = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const {admin,setadmin}=useContext(AdminContext);
    const {user,setuser}=useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", formData).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        if (
          signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.datauser,
            // Only if you are using refreshToken feature
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something
          if(res.data.datauser.role==="admin"){
            setadmin(true);
            navigate("/about");
          }else {
            setuser(true);
            navigate("/about");
          }
         
        } else {
          //Throw error
          alert("tehche");
        }
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"email"}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type={"password"}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button>Submit</button>
    </form>
  );
};
export default SignInComponent;
