import React, { useState } from "react";
import { Card, Button } from "antd";
import { NavLink } from "react-router-dom";

import FuneralExpenseModal from "../Funeral Expense/modals/FuneralExpenseModal";
import CriticalIllnessModal from "../Group Critical Illness/CriticalIllnessModal";
import GroupCreditModal from "../GroupCredit/Modals/GroupCreditModal";
import GroupLifeModal from "../Group Life/Modals/groupLifeModal";
import Educamodal from "../Education/Educamodal";
import Goalbasedmodal from "../Goal Based/Goalbasedmodal";
import GroupTermLifeModal from "../Group Term Life/GroupTermLifeModal";
import "./Product.css";
import AnnuityModal from "../Annuity/modals/AnnuityModal"

const { Meta } = Card;

const Product = ({ product, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderModal = () => {
    switch (index) {
      case 0:
        return (
          <FuneralExpenseModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 1:
        return (
          <CriticalIllnessModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 2:
        return (
          <GroupLifeModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 3:
        return (
          <Educamodal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 4:
        return (
          <GroupTermLifeModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 5:
        return (
          <Goalbasedmodal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 6:
        return (
          <GroupCreditModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      case 7:
        return (
          <AnnuityModal
            isModalOpen={isModalOpen}
            onOkay={handleOk}
            onCancel={handleCancel}
            product={product}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      bordered={false}
      cover={
        <img
          alt={product.title}
          src={product.image}
          className="h-40 object-cover"
        />
      }
      className={`m-4 card-hover`}
    >
      <Meta
        title={<span>{product.title}</span>}
        description={<span>{product.description}</span>}
      />
      <div className="flex flex-col lg:flex-row justify-start mt-4 gap-1">
        <Button
          className="border-0 shadow-none text-[#A32A29]"
          onClick={showModal}
        >
          Learn More
        </Button>

        <Button type="primary" className="border-0 shadow-none">
          <NavLink to={product.url}>Get Cover</NavLink>
        </Button>
      </div>
      {renderModal()}
    </Card>
  );
};

export default Product;
