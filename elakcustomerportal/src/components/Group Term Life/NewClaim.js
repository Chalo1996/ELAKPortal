import React, { useState, createContext, useContext, useRef} from 'react';
import {CompassOutlined,BranchesOutlined ,EuroCircleOutlined,UserOutlined,ArrowLeftOutlined,SoundOutlined,CheckOutlined,EditOutlined,MedicineBoxOutlined,HeartOutlined,MenuUnfoldOutlined,ScissorOutlined,CheckCircleOutlined,DollarOutlined,PoweroffOutlined,FilePdfOutlined,MenuOutlined,ClockCircleOutlined,DashboardOutlined,FormOutlined,ProfileOutlined,PushpinOutlined,SwapOutlined,AuditOutlined,ShareAltOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {Tabs, Row, Col,Card,Table,Space,Form, Input,Divider,Tooltip,Button, DatePicker, Select,Steps, Modal, Radio, Checkbox,Typography } from 'antd';
const { TabPane } = Tabs;
const products = [
    { id: 1, name: 'Notification', icon: <SoundOutlined/>},
    { id: 2, name: 'Requirements', icon: <CheckOutlined/>},
    { id: 3, name: 'Custom' ,icon: <FormOutlined />},
    { id: 4, name: 'Procedures ',icon: <MedicineBoxOutlined/>},
    { id: 5, name: 'Policy ',icon: <HeartOutlined  />},
    { id: 6, name: 'Coverages',icon: <ProfileOutlined />},
    { id: 8, name: 'Reserves',icon: <ScissorOutlined/>},
    { id: 9, name: 'Decision',icon: <CheckCircleOutlined />},
    { id: 9, name: 'Payment',icon: <DollarOutlined/>},
    { id: 9, name: 'Closure',icon: <PoweroffOutlined/>},
    { id: 9, name: 'Files',icon: <FilePdfOutlined />},
    { id: 10, name: 'Timeline' ,icon: <ClockCircleOutlined/>},
    { id: 11, name: 'Related',icon: <CheckOutlined/>},
    { id: 11, name: 'Fraud Analysis',icon: <DashboardOutlined/>},
    { id: 12, name: 'Tasks' ,icon: <PushpinOutlined />},
    { id: 12, name: 'Related' ,icon: <SwapOutlined />},
    { id: 12, name: 'Audit' ,icon: <AuditOutlined />},
    { id: 13, name: 'SubClaims',icon: <BranchesOutlined/>},
    ];

const NewClaim = () => {
const [notificationInput, setNotificationInput] = useState('');
const [selectedItem, setSelectedItem] = useState(null);
const scrollContainerRef = useRef(null); 
const handleScroll = (event) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
};
const navigate = useNavigate();
const handleBackClick = () =>{
        navigate('/home');
    };
const handleItemClick = (item) => {
setSelectedItem(item);
};
 
const contentMapping = {
    1: (
        <div>
        <Tabs defaultActiveKey="1">

            <TabPane tab={ <span><UserOutlined style={{ marginRight: '10px' }}/>Main</span>} key="1"> 
            Content for Main  
            </TabPane>

            <TabPane tab={ <span><MedicineBoxOutlined style={{ marginRight: '10px' }}/>Medical</span>} key="2">
            Content for Medical
            </TabPane>

            <TabPane tab={ <span><EuroCircleOutlined  style={{ marginRight: '10px' }}/>Preliminary Fees</span> }key="3">
            Content for Preliminary Fees
            </TabPane>

            <TabPane tab={ <span><ProfileOutlined style={{ marginRight: '10px' }}/> Scanned Request</span> }key="4">
            Content for Scanned Request
            </TabPane>

            <TabPane tab={ <span><CompassOutlined style={{ marginRight: '10px' }}/>Map</span>}key="5">
            Content for Map
            </TabPane>

        </Tabs>
      </div>
    ),

    2: <div>Content for Requirements</div>,
    3: <div>Content for Custom</div>,
    4: <div>Content for Procedures</div>,
    5: <div>Content for Policy</div>,
    6: <div>Content for Coverages</div>,
    8: <div>Content for Reserves</div>,
    9: <div>Content for Decision</div>,
    10: <div>Content for Payment</div>,
    11: <div>Content for Closure</div>,
    12: <div>Content for Files</div>,
    13: <div>Content for Timeline</div>,
    14: <div>Content for Related</div>,
    15: <div>Content for Fraud Analysis</div>,
    16: <div>Content for Tasks</div>,
    17: <div>Content for Related</div>,
    18: <div>Content for Audit</div>,
    19: <div>Content for SubClaims</div>,
  };

return (
 <>

<Space 
    style={{ fontSize: '19px',marginTop: '10px',fontWeight: '600',alignItems: 'center',cursor: 'pointer'}}
    onClick={handleBackClick}>
    <ArrowLeftOutlined style={{ color: 'black' }}/>Claims
</Space>

      <div 
        className = "scroll-container" 
        onWheel={handleScroll} 
        ref={scrollContainerRef}>
            {products.map(product => (
           <div 
            key={product.id} 
            className="custom-item"
            onClick={() => handleItemClick(product)}
            style={{cursor: 'pointer'}}>
            <span style={{ marginRight: '10px' }}>{product.icon}</span>
            <span className="item-text">{product.name}</span>
       </div>
        ))}
      </div>

      {selectedItem && (
     <div className="content">
        {contentMapping[selectedItem.id] || <p>No content available.</p>}
     </div>
    
      )}







</>
);
}
export default NewClaim;
