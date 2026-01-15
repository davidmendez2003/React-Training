import { useState } from "react";
export default function App(){

  const [values, setValues] = useState({name: "", email: "", phone: "", password: ""});
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) =>{
  const name = e.target.name;
  const value = e.target.value; 
  const updatingValues = {...values, [name]: value}
  setValues(updatingValues);
  const newErrors = validate(updatingValues);
  setErrors({...errors, [name]: newErrors[name] || ""});
  
};

const handleSubmit = (e) =>{
  e.preventDefault();
  setErrors(validate(values));
  alertmsg();
};

const alertmsg = (e) =>{
  if (values.name==="" || values.email===""||values.phone===""||values.password===""){
  alert("Data Insufficient");

  }else if (Object.keys(errors).length === 0) {
      
    alert("Sign Up Successfull");
}}

const validate = (values) =>{
  const errors = {};
  const emailRegularExprsn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegularExprsn = /^\d{10}$/;
  const passwordRegularExprsn = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()\-+=^])(?=\S+$).{6,12}$/;

  if(!values.name){
    errors.name="Name is required*"
  }
  if(!values.email){
    errors.email="Email is required*"
  }else if(!emailRegularExprsn.test(values.email)){ 
    errors.email="Not a valid email*"
  }
  if(!values.phone){
    errors.phone="Phone number is required*"
  }else if(!phoneRegularExprsn.test(values.phone)){
    errors.phone="Not a valid number*"
  }
  if(!values.password){
    errors.password = "Password is required*"
  }else if(!passwordRegularExprsn.test(values.password)){
    errors.password = "Password must be 6 to 12 characters, include at least 1 uppercase letter, lowercase letter, digit, and special character (!@#$%&*()-+=^) and contain no spaces*"
  }

  return errors;
  
  
};


  return(
   <form autoComplete="off" > 
    <div className="flex flex-col justify-center h-screen items-center"> 
      <div className="flex flex-col justify-center w-[500px] min-h-[550px] gap-6 bg-amber-50 rounded-xl shadow-xl">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold mt-2 ">Sign Up Form</h1>
        </div>

        <div className="flex flex-col ml-16 gap-2 justify-center">
          <label htmlFor="name" className="text-xs font-semibold mt-[5px] text-gray-800">Full Name</label> <input type="text"  name="name" value={values.name} onChange={handleChange} className="text-sm rounded-md p-[3px] w-[200px] border-2 border-blue-200"></input>
        <p className="text-red-600 text-sm ">{errors.name}</p>
        </div>

        <div className="flex flex-col ml-16 gap-2 justify-center">
          <label htmlFor="email" className="text-xs font-semibold mt-[5px] text-gray-800">E-mail</label> <input type="email"  name="email" value={values.email} onChange={handleChange} className="text-sm rounded-md p-[3px] w-[250px] border-2 border-blue-200"></input>
        <p className="text-red-600 text-sm ">{errors.email}</p>
        </div>

        <div className="flex flex-col ml-16 gap-2 justify-center">
          <label htmlFor="phone" className="text-xs font-semibold mt-[5px] text-gray-800">Phone</label> <input type="text"  name="phone" value={values.phone} onChange={handleChange} className="text-sm rounded-md p-[3px] w-[200px] border-2 border-blue-200"></input>
        <p className="text-red-600 text-sm ">{errors.phone}</p>
        </div>

        <div className="flex flex-col ml-16 mr-12 gap-2 justify-center">
          <label htmlFor="password" className="text-xs font-semibold mt-[5px] text-gray-800">Password</label> <input type="password"  name="password" value={values.password} onChange={handleChange} className="text-sm rounded-md p-[3px] w-[200px] border-2 border-blue-200"></input>
        <p className="text-red-600 text-sm ">{errors.password}</p>
        </div>        

        <div className="flex justify-center mb-4" >
           <button  type="button" onClick={handleSubmit}  className="h-6 w-20 bg-blue-500 cursor-pointer text-white font-base rounded-md text-base  hover:bg-blue-600" >Sign Up</button>
        </div>
      </div>
    </div>
  </form>  
  );
}