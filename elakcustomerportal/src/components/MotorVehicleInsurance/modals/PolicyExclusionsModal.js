import React from "react";
import { Modal, Button } from "antd";

const PolicyExclusionsModal = ({ visible, onCancel, onAccept }) => {
  return (
    <Modal
      title="Policy Exclusions"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="accept" type="primary" onClick={onAccept}>
          I agree
        </Button>,
      ]}
    >
      <p style={{ marginBottom: '20px' }}>
        This Policy does not cover any of the Benefits stated herein if a claim event in respect of a Life Assured is
        caused by, is a consequence of or is contributed by, whether directly or indirectly, any of the following:
      </p>
      <ol className="text-[#929497]">
        <li style={{ marginBottom: '20px' }}>
          a). Active risks of war or war-like operations (whether war be declared or not), acts of foreign enemy, civil war
          or commotion, mutiny, riot, insurrection, rebellion, revolution, terrorism, military or usurped power, where
          the Life Assured was an active participant.
        </li>
        <li style={{ marginBottom: '20px' }}>b). Active participation in riots, strikes or civil insurrection.</li>
        <li style={{ marginBottom: '20px' }}>c). A consequence of the execution of a judicial sentence of death.</li>
        <li style={{ marginBottom: '20px' }}>d). Participation in any criminal act.</li>
        <li style={{ marginBottom: '20px' }}>
          e). Nuclear, biological, or chemical weapons, materials or attacks or from the release of radioactivity or nuclear,
          biological or chemical warfare agents, including instances where release has happened by the use of information
          technology, or from ionizing radiations or contamination by radioactivity from any nuclear fuel, material or
          waste from the combustion of any nuclear fuel. 
          <br/>
          For the purposes of this exclusion, combustion shall include any
          self-sustaining process or nuclear fusion.
        </li>
      </ol>
    </Modal>
  );
};

export default PolicyExclusionsModal;
