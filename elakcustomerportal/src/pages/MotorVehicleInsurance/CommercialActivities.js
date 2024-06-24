import React from "react";
import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


import ContactDetails from "../../components/Group Life/ContactDetails";

const { Title } = Typography;

const CommercialActivities =()=>{
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate(-1);
      };
    
      return (
        <div className="pt-5 pl-4">
          <div className="flex items-center">
            <button className="mb-5 focus:outline-none hover:text-[#A32A29]">
              <LeftOutlined className="w-8 h-4" style={{ marginTop: '10px' }}onClick={handleNavigate} />
            </button>
            <Title level={5} style={{ marginBottom: '10px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
             Motor Vehicle Insurance
            </Title>
            <ContactDetails />

        </div>
        </div>
      );
};


export default CommercialActivities;