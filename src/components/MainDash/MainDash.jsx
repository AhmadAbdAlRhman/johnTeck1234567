import React ,{ useContext,useState } from "react";
import "./MainDash.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
import { AuthContext } from "../../Authentication/AuthProvider";
function MainDash() {
  const { login } = useContext(AuthContext);
  const [password, setPassword] = useState(""); // لتخزين قيمة كلمة المرور
  const [showPassword, setShowPassword] = useState(false); // للتحكم في عرض النص أو النقاط
  const navigate=useNavigate();
  const req=async(e)=>{
    e.preventDefault();
    try{
      const r=await axios.post("https://johntekvalves.com/backend/api/admin/login",{password},{headers: {
        'Content-Type': 'application/json'},
         withCredentials: true}); // If your backend requires credentials like cookies;
      console.log(r.status)
      if(r.status===200){
        const token = r.data.token;
        const mockToken = token;
        login(mockToken);
        navigate("/Dashboardproducts")
      }
    }
    catch(error){
      if (error.response) {
        // الخطأ جاء من الخادم
        console.error('Error:', error.response.data.message);
        alert(`Error: ${error.response.data.message}`); // عرض رسالة للمستخدم
      } else {
        // خطأ غير متوقع
        console.error('Unexpected Error:', error.message);
        alert('Unexpected error occurred. Please try again later.');
      } 
    }
  }
  return (
    <><HeaderAdmin/>
    <div className="tota">
      <h1>Welcome to Main DashBoard</h1>
      <form action="post">
      {/* حقل الإدخال */}
      <input
        type={showPassword ? "text" : "password"} // تغيير نوع الإدخال بناءً على الحالة
        className="styled-input"
        placeholder="Enter your password..."
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {/* أيقونة لإظهار أو إخفاء الباسوورد */}
      <i 
        className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
        onClick={() => setShowPassword(!showPassword)} // عند الضغط يتم تبديل الحالة
        style={{ cursor: "pointer", marginRight: "10px" , marginLeft: "-33px"}}
      ></i>
      <button type="submit" onClick={(e) => req(e)} className="styleokmain"> ok </button>
      </form>
    </div>
 </>
  );
}

export default MainDash;