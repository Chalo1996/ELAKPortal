import React, { useState, createContext, useContext, useRef} from 'react';
import {InboxOutlined,CompassOutlined,BranchesOutlined ,EuroCircleOutlined,UserOutlined,ArrowLeftOutlined,SoundOutlined,CheckOutlined,EditOutlined,MedicineBoxOutlined,HeartOutlined,MenuUnfoldOutlined,ScissorOutlined,CheckCircleOutlined,DollarOutlined,PoweroffOutlined,FilePdfOutlined,MenuOutlined,ClockCircleOutlined,DashboardOutlined,FormOutlined,ProfileOutlined,PushpinOutlined,SwapOutlined,AuditOutlined,ShareAltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {Upload,message,Tabs,Option, Row, Switch,Col,Card,Table,Space,Form, Input,Divider,Tooltip,Button, DatePicker, Select,Steps, Modal, Radio, Checkbox,Typography } from 'antd';


import annuity from '../../assets/annuityImg.jpg';
import funeral from '../../assets/coffindancere.jpg';
import critical from '../../assets/ciImg.jpg';
import goalbased from '../../assets/goal.png';
import termlife from '../../assets/happyfamily.png';
import education from '../../assets/edu.jpg';
import groupcredit from '../../assets/groupcredit.png';
import grouplife from '../../assets/greatness.jpeg';
import motorvehicle from '../../assets/images/motorImg.jpg';
 
const { TabPane } = Tabs;
const { TextArea } = Input;

const products = [
    { name: 'Motor Vehicle', image: motorvehicle, form: 'motorVehicle' },
    { name: 'Critical Illness Claim', image: critical, form: 'criticalIllness' },
    { name: 'Group Life Assurance Claim', image: grouplife, form: 'groupLife' },
    { name: 'Education Claim', image: education, form: 'education' },
    { name: 'Term Life Claim', image: termlife, form: 'termLife' },
    { name: 'Goal Based', image: goalbased, form: 'goalBased' },
    { name: 'Group Credit', image: groupcredit, form: 'groupCredit' },
    { name: 'Annuity', image: annuity, form: 'annuity' },
    { name: 'Funeral Expense Claim', image: funeral, form: 'funeral' },
  ];

const AllClaims = () => {
    const [visibleForm, setVisibleForm] = useState(null);
    const scrollRef = useRef(null);

    const navigate = useNavigate();
    const handleBackClick = () =>{
        navigate('/home');
        };

    const handleCardClick = (form) => {
        setVisibleForm(form);
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        };
    const handleCloseForm = () => {
    setVisibleForm(null);
    };
    

    const commonFields = (
        <div>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="ID Number" name="idNumber" rules={[{ required: true, message: 'Please enter your ID number' }]}>
            <Input placeholder="Enter your ID number" />
          </Form.Item>
          {/* Add other common fields as needed */}
        </div>
      );

    return(
    <>

    <Space style={{ fontSize: '19px', marginTop: '10px', fontWeight: '600', alignItems: 'center', cursor: 'pointer'}}
           onClick={handleBackClick}>
         <ArrowLeftOutlined style={{ color: 'black' }}/>
         Select the nature of  the claim you want to make.
    </Space>

    <div style={{ padding: '20px' , marginTop: '40px'}}>
        <Row gutter={[24, 24]}>  {/* Increase the gutter space */}
          {products.map((product, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} className="product-col">
              <Card
                hoverable
                className="card"
                cover={
                  <div style={{ position: 'relative'}}>
                    <img
                      alt={product.name}
                      src={product.image}
                      className="card-image"
                      style={{ height: '200px', objectFit: 'cover' }}/>
                  </div>
                }
                onClick={() => handleCardClick(product.form)}>
                <Card.Meta className="card-meta" title={product.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    <div ref={scrollRef} style={{ height: '0px'}}/>


    <div className="slide-in-form">
    <div className="form-content">
      <button className="close-button" onClick={handleCloseForm}></button>
      {visibleForm === null && commonFields}
      {visibleForm === 'motorVehicle' && (
        <div>
        <h1
        style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '150px' }}>
        Motor  Vehicle
        </h1>
          <Form.Item
            label="Policy"
            name="policy"
            rules={[{ required: true,marginTop: '100px', message: 'Type to search policy!' }]}>
            <Input
              rules={[{ required: true,marginTop: '100px', message: 'Type to search policy!' }]}
            placeholder='Type to search policy'
            name="policy"/>
          </Form.Item>
        </div>
      )}


    {visibleForm === 'criticalIllness' && (
        <div>
        <h1
        style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '150px' }}>
        Critical Illness
        </h1>
          <Form.Item
            label="Policy"
            name="policy"
            rules={[{ required: true,marginTop: '100px', message: 'Type to search policy!' }]}>
            <Input
              rules={[{ required: true,marginTop: '100px', message: 'Type to search policy!' }]}
            placeholder='Type to search policy'
            name="policy"/>
          </Form.Item>
        </div>
      )}
        
    </div>
</div>

    </>
    );
}
export default AllClaims;