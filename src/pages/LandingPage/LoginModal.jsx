import React, { useContext, useState } from "react";
import AuthFieldsContainer from "../../components/auth/AuthFieldsContainer";
import Input from "../../components/ui/Input";
import { Logo } from "../../components/ui/Logo";
import ButtonM from "../../components/ui/ButtonM";
import google from "../../assets/google.png";
import office from "../../assets/office.jpeg";
import useScreenType from "../../hooks/useScreenType";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import { baseURL } from "../../api";

const width = 400;
const height = 500;

const LoginModal = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

 
  const myDevice = useScreenType();

  const left =
    typeof window !== "undefined" && window.innerWidth / 2 - width / 2;
  const top =
    typeof window !== "undefined" && window.innerHeight / 2 - height / 2;

  const googleLogin = () => {
    myDevice == "isDesktop"
      ? window.open(
          `${baseURL}/auth/google `,
          "",
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
        )
      : window.location.replace(`${baseURL}/auth/google`);
  };

  const officeLogin = () => {
    myDevice === "isDesktop"
      ? window.open(
          `${`${baseURL}/auth/microsoft`}`,
          "",
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
                  scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
                  height=${height}, top=${top}, left=${left}`
        )
      : window.location.replace(`${baseURL}/auth/microsoft`);
  };

  const { conn } = useContext(WebSocketContext);

  return (
    <AuthFieldsContainer className="max-w-screen-xl  mx-auto px-4 lg:w-[800px]">
      <div className="text-center md:text-left md:flex md:justify-between md:items-center md:pb-6 flex-col flex">
        <h2 className="text-app-white text-2xl font-semibold">
          Log in to Ashesi iConnect
        </h2>
        <div className="md:pl-6 pl-6">
          <Logo width={120} />
        </div>
      </div>

      <div className="p-3 md:p-5">
        <h3 className="text-app-white">Email Address </h3>
        <Input
          placeholder=""
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
      </div>

      <div className="p-3 md:p-5">
        <h3 className="text-app-white">Password </h3>
        <Input
          placeholder=""
          value={inputValue}
          type={"password"}
          onChange={handleInputChange}
          className="w-full"
          style={{ width: "100%" }}
        />
      </div>

      <div className="p-3 md:p-5">
        <ButtonM
          type="primary"
          className="text-lg text-white bg-red-900 hover:bg-red-700 w-full text-center"
        >
          Login
        </ButtonM>
      </div>

      <div className="text-lg text-center text-app-white">
        Continue with your socials
      </div>

      <div className="p-3 md:p-5 flex flex-col md:flex-row justify-between items-center">
        <ButtonM
          onClick={() => {
            googleLogin();
          }}
          type="primary"
          className="p-3 bg-input-bg-color text-black flex items-center gap-2 mb-2 md:mb-0"
        >
          <img src={google} height={20} width={20} alt="Google Icon" />
          Continue with Google
        </ButtonM>
        <span className="text-app-white md:mx-3 my-2 md:my-0">OR</span>
        <ButtonM
          onClick={() => {
            officeLogin();
          }}
          type="primary"
          className="p-3 bg-input-bg-color text-black flex items-center gap-2"
        >
          <img src={office} height={20} width={20} alt="Office Icon" />
          Continue with Office
        </ButtonM>
      </div>

      <div className="text-sm text-center py-2 text-gray-400">
        Don't have an account yet?{" "}
        <span className="cursor-pointer text-red-900">Register</span>
      </div>
    </AuthFieldsContainer>
  );
};

export default LoginModal;