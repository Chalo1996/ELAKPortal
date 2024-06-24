import { LeftOutlined } from "@ant-design/icons";

const Signup = () => {
  const handleNavigate = () => {
    console.log("Navigate back");
  };

  return (
    <div className="pt-5 pl-4">
      <div className="mb-4">
        <span>
          <button className="mb-2 focus:outline-none hover:text-[#A32A29]">
            <LeftOutlined className="w-8 h-8" onClick={handleNavigate} />
          </button>
        </span>
        <span className="font-open-sans text-[16px] font-semibold leading-[24px] text-left">
          Register
        </span>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore,
        dolor porro sint similique sapiente culpa id obcaecati odio sunt,
        eveniet quaerat, corrupti quas et amet facere dignissimos nihil
        voluptatem?
      </p>
    </div>
  );
};

export default Signup;
