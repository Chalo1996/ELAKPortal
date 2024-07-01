import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = ({ handleNavigate }) => {
  return (
    <>
    <div className="pt-5 pl-4">
      <div className="flex items-center">
        <button className="mb-5 focus:outline-none hover:text-[#A32A29]" onClick={handleNavigate}>
          <LeftOutlined className="w-8 h-8" />
        </button>
        <Title level={5} style={{ marginBottom: '20px' }} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Dashboard
        </Title>
      </div>
    </div>
      <div className="bg-white h-216.68 pt-188 pl-357">
      <div className="mb-20">
        <h4 className="font-open-sans text-20px font-semibold leading-20px text-[#221f1f]">Insurance Product</h4>
      </div>
      <br></br>
    
      <div className="flex flex-col gap-4">
        <div className="bg-[#221f1f] w-335 h-76 pt-421 pl-357"></div>
        <div className="bg-[#F7F7F7] w-335 h-76 mt-12 px-12 py-4">
          <h4 className="text-base font-semibold mb-2">My Pending Quotes</h4>
          <p className="text-sm text-gray-600">Would you like to purchase an insurance policy?</p>
        </div>
      </div>
   
    </div>
    </>
  );
};

export default Dashboard;

