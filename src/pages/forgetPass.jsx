import { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { PiCodeSimpleBold } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {

    const [isOtpVarify, setIsOtpVarify] = useState(false);
    const [contact, setContact] = useState('');
    const [msg, setMsg] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [otp, setOtp] = useState("");
    const [pass, setPass] = useState("");
    const [userOtp, setUserOtp] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
      if(userOtp.length === 6 && userOtp === otp){
        setIsOtpVarify(true)
        toast.success('Otp varifed !!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      else if(userOtp.length > 5 && userOtp != otp){
        setIsOtpVarify(false)
      }
    },[userOtp])

    const sendOtp = () => {
      if(contact.length === 10){
        console.log(contact)
        fetch(`${import.meta.env.VITE_BASE_URL}/auth/forgetpassowrd/getotp`, {
          method: "POST",
          body: JSON.stringify({"phone": contact}),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success === true) {
              console.log(res.message)
              setOtp(res.data)
              toast.success(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }else{
              toast.error(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            }
          }).catch((err) => {
            console.log(err);
          });
      }else{
        setMsg("Mobile number must be 10 digit")
      }
    }

    const handleResetPass = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/auth/setpassword`, {
          method: "PUT",
          body: JSON.stringify({"phone": contact, "password": pass}),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success === true) {
              console.log(res.message)
              toast.success(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
              navigate("/login");
            }else{
              toast.error(res.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            }
          }).catch((err) => {
            console.log(err);
          });
    }

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        {!isOtpVarify && <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forget Password</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                Contact No
              </label>
              <div className="relative">
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  value={contact}
                  placeholder="Enter your number"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setContact(e.target.value)}
                />

                <span className="absolute right-4 top-3.5">
                <BsTelephone className="text-gray-500 h-5 w-5" />
                </span>
              </div>
            </div>
            {msg && <span className="text-[#b91c1c]">
              {msg}
            </span>}
            
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg"
                onClick={sendOtp}
              >
                Send OTP
              </button>
              </div>

              <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                OTP
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={userOtp}
                  placeholder="Enter your OTP"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e)=> setUserOtp(e.target.value)}
                />

                <span className="absolute right-4 top-3.5">
                <PiCodeSimpleBold  className="text-gray-500 h-5 w-5" />
                </span>
              </div>
              {msg && <span className="text-[#15803d]">
                {msg}
              </span>}
            </div>
          </div>
          </div>}
        {isOtpVarify && <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
          </div>
          <div className="space-y-4">
            <div>
            <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={pass}
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e)=> setPass(e.target.value)}
                    />
                    <span className="absolute right-4 top-3.5">
                    {!showPass && (
                  <FaRegEye className="text-gray-500 h-5 w-5 cursor-pointer" 
                    onClick={() => {
                      setShowPass(!showPass);
                    }}/>
                )}
                {showPass && (
                  <FaRegEyeSlash className="text-gray-500 h-5 w-5 cursor-pointer"  
                  onClick={() => {
                    setShowPass(!showPass);
                  }}/>
                )}
                </span>
                  </div>
            </div>
            <div className="flex justify-center">
            <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg"
                onClick={handleResetPass}
              >
                Reset
              </button>
              </div>
            </div>
        </div>}
      </div>
    </div>
  );
}
