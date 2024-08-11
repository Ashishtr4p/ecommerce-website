import React,{ useState } from 'react';
import {
  Link , useParams , Navigate , useNavigate, 
} from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import logo from './Components/card.png'

function ResetpasswordPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newpassword,setNewPassword] = useState('');
  const [NewconfirmPassword,setNewConfirmPassword] = useState('');
  
  const SubmitHandler = async () => {
    if (newpassword !== NewconfirmPassword) {
      toast.error('Password doesnot match');
    } else {
      if (newpassword.length < 5) {
        toast.error('Enter Strong Password');
        return;
      }
      const putbody = {
        id,
        password: newpassword,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/resetPassword`,putbody);
      // console.log(response,'this is response');
      if (response.data.data1 === 'success') {
        toast.success('Password Updated Successfully');
        setNewPassword('');
        setNewConfirmPassword('');
        setTimeout(() => {
          window.location.href = `${process.env.REACT_APP_API_URL}/account`;
        },[1000]);
      } else {
        toast.error('Failed to update password');
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-white sm:bg-gray-100 w-screen min-h-screen">
      <div className="w-[370px] rounded-md space-y-5 border-[1px] border-[#E2E8F0]  shadow-xl py-5 px-7">
        <div className="flex justify-center">
          <img src={logo} alt="logo not found" className=" w-[300px]" />
        </div>
        <div className="flex justify-center">
          <h3>Reset Password</h3>
        </div>
        <div>
          <input 
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newpassword}
            className="hover:!ring-2 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white max-h-[120px] min-h-[40px] h-[40px] resize-none
                            rounded-[8px] outline-none  p-3 disabled:bg-gray-300 text-sm placeholder:text-sm
                            hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          />
        </div>
        <div>
          <input 
            placeholder="Confirm New Password "
            onChange={(e) => setNewConfirmPassword(e.target.value)}
            value={NewconfirmPassword}
            className="hover:!ring-2 w-[100%] shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white max-h-[120px] min-h-[40px] h-[40px] resize-none
                            rounded-[8px] outline-none  p-3 disabled:bg-gray-300 text-sm placeholder:text-sm
                            hover:!ring-blue-200  hover:!border-blue-500 focus:!ring-4 focus:!ring-blue-200 focus:!border-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-[#3975CB] hover:bg-blue-700 p-2 rounded-md text-white"
          onClick={SubmitHandler}
        >
          Change password
        </button>
        
      </div>
      <div className="flex flex-row justify-center gap-2 items-center mt-5">
        <span className="text-gray-400 flex regular self-center mt-1 text-[12px] gap-1">
          Powered by 
          Signature Furniture outlet
        </span>
      </div>
      <Toaster/>
    </div>
  );
}

export default ResetpasswordPage;
