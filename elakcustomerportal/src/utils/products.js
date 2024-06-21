import gleImg from "../assets/images/funeral-expense.jpg";
import glaImg from "../assets/glaImg.png";
import edu from "../assets/edu.jpg";
import goal from "../assets/goal.png";
import introImage from "../assets/introImage.jpg";
import happyfamily from "../assets/happyfamily.png";
import groupcreditImg from "../assets/groupcredit.png";
import annuityImg from "../assets/annuityImg.jpg";

const products = [
  {
    title: "Funeral Expense Cover",
    url: "funeral-expense/select-customer-type",
    image: gleImg,
    description:
      "Funeral expense solution is designed to help families deal with the burden of meeting immediate funeral related expenses on the death of a family member.",
  },
  {
    title: "Critical Illness Cover",
    image: introImage,
    url: "customer-type",
    description:
      "Critical Illness insurance provides comprehensive coverage for against chronic illnesses such as cancer, ensuring you receive the best healthcare possible.",
  },
  {
    title: "Group Life Asurance",
    url: "group-life-assurance",
    image: glaImg,
    description:
      "This cover is available to organizations, providing a death benefit in the event an employee dies before attainment of the retirement age in accordance with the benefits specified in the policy.",
  },
  {
    title: "Education Insurance Cover",
    url: "education",
    image: edu,
    description:
      "An education insurance cover is a financial plan ensuring funds for a child's education, providing savings and protection against uncertainties like parent's death or disability.",
  },
  {
    title: "Term Life Insurance",
    url: "term-life-quote",
    image: happyfamily,
    description:
      "Term life insurance is a type of life insurance policy that provides coverage for a specified period during  which if the policyholder dies, a death benefit is paid out to the designated beneficiaries.",
  },
  {
    title: "Goal Based Insurance Cover",
    url: "goal-based",
    image: goal,
    description:
      "Goal-based insurance cover tailors financial protection plans to meet specific life objectives, ensuring personalized coverage for short-term, Medium-term and long-term financial goals.",
  },
  {
    title: "Group Credit Life Insurance",
    image: groupcreditImg,
    url: "group-credit",
    description:
      "A group credit life insurance policy is issued by an insurance company to a creditor institution, such as a bank, covering the lives of the bank's current and future debtors. Unlike other group life plans, the bank is both the policyholder and the beneficiary of the life insurance.",
  },
  {
    title: "Annuity Insurance Policy",
    url: "annuity",
    image: annuityImg,
    description:
      "Annuities provide a steady income stream during retirement, offering peace of mind and financial stability. Whether you're planning for retirement or looking to convert your savings into a reliable income, our annuity solutions are designed to meet your needs.",
  },
];
export default products;
