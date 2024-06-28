import React, { useState, createContext, useContext, useRef} from 'react';
import {CompassOutlined,BranchesOutlined ,EuroCircleOutlined,UserOutlined,ArrowLeftOutlined,SoundOutlined,CheckOutlined,EditOutlined,MedicineBoxOutlined,HeartOutlined,MenuUnfoldOutlined,ScissorOutlined,CheckCircleOutlined,DollarOutlined,PoweroffOutlined,FilePdfOutlined,MenuOutlined,ClockCircleOutlined,DashboardOutlined,FormOutlined,ProfileOutlined,PushpinOutlined,SwapOutlined,AuditOutlined,ShareAltOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {Tabs,Option, Row, Switch,Col,Card,Table,Space,Form, Input,Divider,Tooltip,Button, DatePicker, Select,Steps, Modal, Radio, Checkbox,Typography } from 'antd';
const { TabPane } = Tabs;
const { TextArea } = Input;


const products = [
    { id: 1, name: 'Notification', icon: <SoundOutlined/>},
    { id: 2, name: 'Requirements', icon: <CheckOutlined/>},
    { id: 3, name: 'Custom' ,icon: <FormOutlined />},
    { id: 4, name: 'Procedures ',icon: <MedicineBoxOutlined/>},
    { id: 5, name: 'Policy ',icon: <HeartOutlined  />},
    { id: 6, name: 'Coverages',icon: <ProfileOutlined />},
    { id: 8, name: 'Reserves',icon: <ScissorOutlined/>},
    { id: 9, name:  'Decision',icon: <CheckCircleOutlined />},
    { id: 9, name:  'Payment',icon: <DollarOutlined/>},
    { id: 9, name:  'Closure',icon: <PoweroffOutlined/>},
    { id: 9, name:  'Files',icon: <FilePdfOutlined />},
    { id: 10, name: 'Timeline' ,icon: <ClockCircleOutlined/>},
    { id: 11, name: 'Related',icon: <CheckOutlined/>},
    { id: 11, name: 'Fraud Analysis',icon: <DashboardOutlined/>},
    { id: 12, name: 'Tasks' ,icon: <PushpinOutlined />},
    { id: 12, name: 'Related' ,icon: <SwapOutlined />},
    { id: 12, name: 'Audit' ,icon: <AuditOutlined />},
    { id: 13, name: 'SubClaims',icon: <BranchesOutlined/>},
    ];

const NewClaim = () => {
const { Option } = Select;
  
const [selectedProvider, setSelectedProvider] = useState(null);
const [cashCall, setCashCall] = useState(false);
const [cooperationClause, setCooperationClause] = useState(false);
const [facultative, setFacultative] = useState(false);
const [cashCallReceived, setCashCallReceived] = useState(false);

const [notificationInput, setNotificationInput] = useState('');
const [selectedItem, setSelectedItem] = useState(null);
const [formData, setFormData] = useState({ 
  name:'',
  policy: '', 
  claimer:'',
  claimType: 'Please Select Claim Type',
  insuredAffected :'Please Select Insured Affected',
  companyName:'',
  insuredEvent:'Please Select Insured Event',
  eventReason:'Please Select Event Reason',
  claimMigrationCode:'',
  reinsuranceEvent:'',
  dateOfOccurrence:'',
  krapin:'',
  idnumber:'',
  description:'',
  nameOfProvider:''
});


const providerOptions = [
  { label: 'DR BONIFACE OSUKA', value: 'DR BONIFACE OSUKA' },
  { label: 'DR CAROLINE', value: 'DR CAROLINE' },
];

const handleCashCallChange = (checked) => {
  setCashCall(checked);
};
const handleCooperationClauseChange = (checked) => {
  setCooperationClause(checked);
};
const handleFacultativeChange = (checked) => {
  setFacultative(checked);
};
const handleCashCallReceived = (checked) => {
  setCashCallReceived(checked);
};

const handleFormChange = (changedValues) => {
  setFormData((prevFormData) => ({
      ...prevFormData,
      ...changedValues,
  }));
};

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

const handleInputChange = (e) => {
  const { name, value} = e.target;
  setFormData((prevFormData) =>
  ({ ...prevFormData, [name]: value }));
};

  const handleSelectChange = (value, name) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};
 
const isPolicySelected = !!formData.policy;
console.log(formData.companyName);

const contentMapping = {
    1: (
        <div>
        <Tabs defaultActiveKey="1">
            <TabPane tab={ <span><UserOutlined style={{ marginRight: '10px' }}/>Main</span>} key="1"> 
            <h1 style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '5px' }}>
                Main section
            </h1>

            <Form 
              layout="vertical" 
              onValuesChange={(_, allValues) => handleFormChange(allValues)} initialValues={formData}>
                <Row gutter={16}>
                <Col span={12}>
                      <Form.Item
                      label="Policy"
                      name="policy"
                      rules={[{ required: true, message: 'Type to search policy!' }]}>
                      <Input
                      placeholder='Type to search policy'
                      name="policy"
                      value={formData.policy}
                      onChange={handleInputChange}/>
                      </Form.Item>

                      <Form.Item
                      label="Claimer"
                      name="claimer"
                      rules={[{ required: true, message: 'Type to search contact!' }]}>
                      <Input
                      placeholder='Type to search contact'
                      name="claimer"
                      value={formData.claimer}
                      onChange={handleInputChange}/>
                      </Form.Item>

                      <Form.Item
                      label="Insured Affected"
                      name="insuredAffected"
                      placeholder="Select Policy First"
                      rules={[{ required: true, message: 'Select Policy First!' }]}>
                      <Select
                      placeholder="Select Policy First"
                      disabled={!formData.policy}
                      value={formData.insuredAffected}
                      onChange={(value) => handleSelectChange(value, 'insuredAffected')}>
                      <Option value="insured1">Insured 1</Option>
                      <Option value="insured2">Insured 2</Option>
                      <Option value="insured3">Insured 3</Option>
                      </Select>
                      </Form.Item>

                      <Form.Item
                      label="Company name"
                      name="companyName"
                      rules={[{ required: true, message: 'Please entercompany name!' }]}>
                      <Input
                      placeholder='Please entercompany name'
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}/>
                      </Form.Item>

                      <Form.Item
                      label="Insured Events"
                      name="insuredEvent"
                      placeholder="Select Insured Event"
                      rules={[{ required: true, message: 'Select Insured Event!' }]}>
                      <Select
                        placeholder="Select Insured Event"
                        disabled={!formData.policy}
                        value={formData.insuredEvent}
                        onChange={(value) => handleSelectChange(value, 'insuredEvent')}>
                        <Option value="insured1">Event 1</Option>
                        <Option value="insured2">Event 2</Option>
                        <Option value="insured3">Event 3</Option>
                      </Select>
                      </Form.Item>

                      <Form.Item
                      label="Event Reason"
                      name="eventReason"
                      placeholder="Select Event Reason"
                      rules={[{ required: true, message: 'Select Event Reason!' }]}>
                      <Select
                        placeholder="Select Event Reason"
                        disabled={!formData.policy}
                        value={formData.eventReason}
                        onChange={(value) => handleSelectChange(value, 'eventReason')}>
                        <Option value="insured1">Reason 1</Option>
                        <Option value="insured2">Reason 2</Option>
                        <Option value="insured3">Reason 3</Option>
                      </Select>
                      </Form.Item>

                      <Form.Item
                      label="Claim Type"
                      name="claimType"
                      rules={[{ required: true, message: 'Select Policy First!' }]}>
                      <Select
                      disabled={!formData.policy}
                      placeholder="Select Claim Type"
                      value={formData.claimType}
                      onChange={(value) => handleSelectChange(value, 'claimType')}>
                      <Option value="type1">Type 1</Option>
                      <Option value="type2">Type 2</Option>
                      <Option value="type3">Type 3</Option>
                      </Select>
                      </Form.Item>
                      </Col>

                      <Col span={12}>
                      <Form.Item
                      label="Claim Migration Code"
                      name="claimMigrationCode"
                      rules={[{ required: true, message: 'Enter Claim Migration Code!' },
                              { pattern: /^\d+$/, message: 'Please enter numbers only!' }]}>
                      <Input
                      placeholder='Enter Claim Migration Code'
                      name="claimMigrationCode"
                      value={formData.claimMigrationCode}
                      onChange={handleInputChange}/>
                      </Form.Item>

                      <Form.Item
                      label="Reinsurance Event"
                      name="reinsuranceEvent"
                      rules={[{ required: true, message: 'Select ReInsurance Event!' }]}>
                      <Select
                      placeholder="Select Reinsurance Event"
                      value={formData.reinsuranceEvent}
                      onChange={(value) => handleSelectChange(value, 'reinsuranceEvent')}>
                      <Option value="type1">TidaWave 1</Option>
                      </Select>
                      </Form.Item>

                      <Form.Item
                      label="Date of Occurrence"
                      name="dateOfOccurrence"
                      rules={[{ required: true, message: 'Please select date of occurrence!' }]}>
                      <DatePicker
                          style={{ width: '100%' }}
                          placeholder="Select date of occurrence"
                          value={formData.dateOfOccurrence}
                          onChange={(date) => handleSelectChange(date, 'dateOfOccurrence')}/>
                      </Form.Item>

                      <Form.Item
                          label="Date of Notification"
                          name="dateOfNotification"
                          rules={[{ required: true, message: 'Please select date of notification!' }]}>
                          <DatePicker
                              style={{ width: '100%' }}
                              placeholder="Select date of notification"
                              value={formData.dateOfNotification}
                              onChange={(date) => handleSelectChange(date, 'dateOfNotification')}
                          />
                      </Form.Item>
  
                      <Form.Item
                      label="KRA PIN"
                      name="krapin"
                      rules={[{ required: true, message: 'Enter KRA PIN!' }]}>
                      <Input
                      placeholder='Enter KRA PIN'
                      name="krapin"
                      value={formData.krapin}
                      onChange={handleInputChange}/>
                      </Form.Item>

                      <Form.Item
                      label="ID  Number"
                      name="idnumber"
                      rules={[{ required: true, message: 'Enter ID Number!'}]}>
                      <Input
                      placeholder='Enter ID Number'
                      name="idnumber"
                      value={formData.idnumber}
                      onChange={handleInputChange}/>
                      </Form.Item>

          <Row gutter={[24, 24]} 
                style={{ marginTop: '40px' }}>

            <div style={{ textAlign: 'center', margin: '0 20px' }}>
                <span>Cash Call</span>
                <br />
                <Switch
                    checked={cashCall}
                    onChange={handleCashCallChange}/>
            </div>

            <div style={{ textAlign: 'center', margin: '0 20px' }}>
                <span>Cooperation Clause</span>
                <br />
                <Switch
                    checked={cooperationClause}
                    onChange={handleCooperationClauseChange}/>
            </div>

            <div style={{ textAlign: 'center', margin: '0 20px'}}>
                <span>Facultative</span>
                <br/>
                <Switch
                    checked={facultative}
                    onChange={handleFacultativeChange}/>
            </div>

            <div style={{ textAlign: 'center', margin: '0 20px' }}>
                <span>Cash Call Received</span>
                <br/>
                <Switch
                    checked={cashCallReceived}
                    onChange={handleCashCallReceived}/>
              </div>
                </Row>
            </Col>
         </Row>

        <Row>
            <Col span={24}>
            <Form.Item
                label="Description"
                name="description">
                <TextArea
                    placeholder="Free Text Description of the Claim"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}/>
            </Form.Item>
        </Col>
              </Row>

            </Form>
            
            </TabPane>

            <TabPane tab={ <span><MedicineBoxOutlined style={{ marginRight: '10px' }}/>Medical</span>} key="2">
            <h1
            style={{ textAlign: 'left', fontSize: '16px', marginBottom: '20px',marginTop: '5px' }}>
             Medical section
            </h1>
            <Row gutter={16}>
            <Col span={12}>

            <Form.Item
              label="Name of Provider"
              name="nameOfProvider"
              rules={[{ required: true, message: 'Please select a provider!' }]}>
              <Select
                placeholder="Select Provider"
                value={formData.nameOfProvider}
                onChange={(value) => handleSelectChange(value, 'nameOfProvider')}>
                {providerOptions.map((provider) => (
                  <Option key={provider.value} value={provider.value}>
                    {provider.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>



            </Col>
            </Row>
















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
