/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
// components
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from '../../components/common/AppSideBar';

const HomePage = ({ setSelectedLink }) => {

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    };

  return (
    <>
          <div className='w-full pt-[20px]'>
          <p className='font-[Inter] font-normal text-[20px] leading-10 tracking-wide text-app-white'>
          <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution. <Link to="/about" className="text-[#00000085] dark:text-[#ffffffac]" onClick={()=>handleLinkClick('about')} >Read more...</Link>
          </p>
        </div>
    </>
  )
}

export default HomePage