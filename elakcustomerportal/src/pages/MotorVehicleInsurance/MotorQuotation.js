import React, { useState } from "react";
import { Card, Row, Col, Table, Button, Checkbox, Typography, message, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import PolicyExclusionsModal from "../../components/Group Life/Modals/PolicyExclusionsModal";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

const data = {
    coverDetails: {
        type: 'COMPREHENSIVE',
        description: 'Accidental loss or damage to insured motor vehicles and/or death, bodily injury or loss or damage to property of third parties arising out of use of motor vehicles owned and/or operated by the insured.'
    },
    vehicleDetails: {
        YOM: 'XXXX',
        estimatedValue: '3,399,999.00',
        tonnage: 'XXXXXX'
    },
    limitsOfLiability: [
        { key: '1', description: 'Third Party Personal Injury', limit: 'Unlimited', excess: '' },
        { key: '2', description: 'Third Party Property Damage', limit: '20,000,000.00', excess: '' },
        { key: '3', description: 'Passenger Liability', limit: '4,000,000.00 per person 20,000,000.00 per event', excess: '' },
        { key: '4', description: 'Medical Expenses', limit: '50,000.00', excess: '' },
        { key: '5', description: 'Towing Charges', limit: '50,000.00 Additional limit charge 10%', excess: '' },
        { key: '6', description: 'Repair Authority', limit: '100,000.00', excess: '' },
        { key: '7', description: 'Windscreen', limit: '50,000.00', excess: '' },
        { key: '8', description: 'Radio Cassette', limit: '50,000.00', excess: '' },
        { key: '9', description: 'Own Damage/Partial Theft', limit: '5% of Sum Insured Min. 30,000.00 / Max. 150,000.00 Kshs', excess: '' },
        { key: '10', description: 'Third Party Property Claims', limit: '100,000.00', excess: '' },
        { key: '11', description: 'Third Party Injury Claims', limit: 'Nil', excess: '' },
        { key: '12', description: 'Theft Claims', limit: 'Theft excess with tracking device Min. 30,000.00 Kshs', excess: '' },
        { key: '13', description: 'Theft Claims', limit: '5% of Sum Insured If anti-theft lifted Min. 30,000.00 / Max. 150,000.00 Kshs', excess: '' }
    ],
    premiumComputation: {
        premium: '144,500.00',
        extensions: [
            { key: '1', description: 'Excess Protector', value: '17,000.00' },
            { key: '2', description: 'Political Violence and Terrorism', value: '17,000.00' }
        ],
        policyholders: '361.00',
        trainingLevy: '289.00',
        firstPremium: '145,150.00'
    },
    importantInformation: [
        { key: '1', title: 'Drivers', description: 'Anyone authorised by the insured with a valid driving license' },
        { key: '2', title: 'Use', description: 'Motor Commercial - General Cartage' },
        { key: '3', title: 'Special Condition Clauses', description: 'Including Special Perils | Kenya Jurisdiction | Limit of Passenger | No Blame No Excess | Riot Strike and Civil Commotion Use of Motor Trade | Agreed Value Basis' }
    ]
};

const columns = [
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '50%'
    },
    {
        title: 'Limits of Liability (Kshs)',
        dataIndex: 'limit',
        key: 'limit',
        width: '25%'
    },
    {
        title: 'Excess (Kshs)',
        dataIndex: 'excess',
        key: 'excess',
        width: '25%'
    }
];

const extensionsColumns = [
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '75%'
    },
    {
        title: 'Value (Kshs)',
        dataIndex: 'value',
        key: 'value',
        width: '25%'
    }
];

const MotorQuotation = () => {

    const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate(-1);
    };

    const formatCurrency = (value) => `KES ${Math.round(value).toLocaleString()}`;

    const handleCheckboxChange = (e) => {
        setIsPolicyModalVisible(true);
        setIsCheckboxChecked(e.target.checked);
    };

    const handleModalAccept = () => {
        setIsPolicyAccepted(true);
        setIsPolicyModalVisible(false);
    };

    const handleDownload = () => {
    };

    const NumberFormat = {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        parser: (value) => value.replace(/(,*)/g, ""),
    };

    return (
        <div className="pt-5 pl-4" style={{ font: "DIN" }}>
            <div className="flex items-center" style={{ marginBottom: "0px", marginTop: "10px" }} >
                <button className="mb-1.5 focus:outline-none hover:text-[#A32A29]" >
                    <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
                </button>
                <Title level={5} className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
                    Motor Vehicle Insurance
                </Title>
            </div>
            <Card>
                <Row justify="end">
                    <Col span={12}>
                        <img src="https://th.bing.com/th/id/OIP.slQhzvN6Tzo0RxGP9AiQSgAAAA?rs=1&pid=ImgDetMain" alt="Company Logo" style={{ maxWidth: "100px", maxHeight: "120px" }} />
                    </Col>
                    <Col span={12}>
                        <Title level={5}>EQUITY GENERAL INSURANCE (KENYA) LIMITED</Title>
                        <Text className="text-[#929497]">P.O Box 350-00202 Nairobi, Kenya</Text><br />
                        <Text className="text-[#929497]">Tel: +254-763026000 | Fax: +254-20-2737276</Text><br />
                        <Text className="text-[#929497]">Email: insurance@equitybank.co.ke</Text><br />
                        <Text className="text-[#929497]">Website: https://www.equitybank.co.ke</Text><br />
                    </Col>
                </Row>
                <Row justify="left">
                    <Title level={5}>Motor Commercial Quotation</Title>
                </Row>
                <Row justify="left">
                    <Col span={12}>
                        <Text>Quotation number QTN123456</Text><br />
                    </Col>
                    <Col span={12}>
                        <Text style={{ color: "#A32A29" }}>Insured: </Text><text> FirstName LastName</text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", height: "25px", backgroundColor: "#A32A29", textAlign: "left", marginTop: "20px" }}>
                            <Title level={5} style={{ color: "white", marginLeft: "10px" }}>Cover Details</Title>
                        </div>
                        <div>
                            <Row style={{ marginTop: "10px", marginLeft: "10px" }}>
                                <Col span={12}>
                                    <text style={{ color: "#A32A29", margin: 0 }}>Cover Type:</text><text> {data.coverDetails.type}</text>
                                </Col>
                                <Col span={12}>
                                    <p>{data.coverDetails.description}</p>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", height: "25px", backgroundColor: "#A32A29", textAlign: "left", marginTop: "20px" }}>
                            <Title level={5} style={{ color: "white", marginLeft: "10px" }}>Vehicle Details</Title>
                        </div>
                        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                            <Row>
                                <Col span={8}>
                                    <p><Text style={{ color: "#A32A29" }}>YOM: </Text> <text> {data.vehicleDetails.YOM}</text></p>
                                    <p><Text style={{ color: "#A32A29" }}>Tonnage: </Text><text>{data.vehicleDetails.tonnage} </text></p>
                                </Col>
                                <Col span={8}>
                                    <p><Text style={{ color: "#A32A29" }}>Estimated Value (Kshs) </Text></p>
                                    <p>(inclusive of accessories and spare parts)</p>
                                </Col>
                                <Col span={8}>
                                    <p><text>{data.vehicleDetails.estimatedValue}</text></p>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", height: "25px", backgroundColor: "#A32A29", textAlign: "left", marginTop: "20px" }}>
                            <Title level={5} style={{ color: "white", marginLeft: "10px" }}>Limits of Liability / Excess</Title>
                        </div>
                        <div >
                            <Table dataSource={data.limitsOfLiability} columns={columns} pagination={false} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", height: "25px", backgroundColor: "#A32A29", textAlign: "left", marginTop: "20px" }}>
                            <Title level={5} style={{ color: "white", marginLeft: "10px" }}>Important Information</Title>
                        </div>
                        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                            {data.importantInformation.map(info => (
                                <div key={info.key}>
                                    <p><strong>{info.title}:</strong> {info.description}</p>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", height: "25px", backgroundColor: "#A32A29", textAlign: "left", marginTop: "20px" }}>
                            <Title level={5} style={{ color: "white", marginLeft: "10px" }}>Premium Computation (Kshs)</Title>
                        </div>
                        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                            <p><strong>Premium:</strong> {data.premiumComputation.premium}</p>
                            <Table dataSource={data.premiumComputation.extensions} columns={extensionsColumns} pagination={false} />
                            <p><strong>Policyholders:</strong> {data.premiumComputation.policyholders}</p> <Text style={{ color: "#A32A29" }}></Text><text></text>
                            <p><strong>Training Levy:</strong> {data.premiumComputation.trainingLevy}</p>
                            <Divider style={{ borderWidth: '1px', borderColor: "#A32A29", borderStyle: 'solid' }} />
                            <p><strong>First Premium:</strong> {data.premiumComputation.firstPremium}</p>
                            <Divider style={{ borderWidth: '1px', borderColor: "#A32A29", borderStyle: 'solid' }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    Mode of Payment:  All premiums are to be directed to Equity Bancassurance.
                    Account name: Equity Insurance Agency Limited   |   Bank: Equity Bank Limited   |   Account No: 0180291028202   |   Branch: Community Corporate
                </Row>
            </Card>
            <div style={{ marginTop: "30px" }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} style={{ marginTop: "4px" }}>
                        <Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} >
                            I accept the{" "}
                            <span onClick={() => setIsPolicyModalVisible(true)} style={{ textAlign: "right", marginTop: "20px", color: "#A32A29" }}>
                                policy exclusions
                            </span>
                        </Checkbox>
                    </Col>
                    <Col xs={24} sm={12}>
                        <div style={{ textAlign: "right", color: "#A32A29" }}>
                            <Button
                                type="primary"
                                style={{ marginRight: "10px" }}
                                disabled={!isPolicyAccepted || !isCheckboxChecked}
                            >
                                Continue with Payment
                            </Button>
                            <Button className="mr-4" style={{ marginRight: "10px" }} onClick={handleDownload}>
                                Download
                            </Button>
                            <Button className="mr-4" style={{ marginRight: "10px" }}>
                                Send to Email
                            </Button>
                        </div>
                    </Col>
                </Row>
                <PolicyExclusionsModal
                    visible={isPolicyModalVisible}
                    onCancel={() => setIsPolicyModalVisible(false)}
                    onAccept={handleModalAccept}
                />
            </div>
        </div>

    );
};

export default MotorQuotation;
