import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupCredit from '../GroupCredit/GroupCredit';
import IndividualCover from '../GroupCredit/personal/IndividualCover';
import MultipleCover from '../GroupCredit/group/MultipleCover';
import GCQuotationPageGroup from '../../pages/GroupCredit/group/GCQuotationPage';
import GCQuotationPagePersonal from '../../pages/GroupCredit/personal/GCQuotationPage';

const GroupCreditRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupCredit />} />
      <Route path="individual-cover" element={<IndividualCover />} />
      <Route path="multiple-cover" element={<MultipleCover />} />
      <Route path="/personal/quotation" element={<GCQuotationPagePersonal />} />
      <Route path="/group/quotation" element={<GCQuotationPageGroup />} />
    </Routes>
  );
};

export default GroupCreditRoutes;
