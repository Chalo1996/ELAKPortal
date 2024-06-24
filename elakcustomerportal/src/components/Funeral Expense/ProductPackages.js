import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Row, Skeleton, Col } from "antd";
import ProductPackage from "./ProductPackage";
import ErrorPage from "../../shared/ErrorPage";

const ProductPackagesForm = ({ form, formData, setFormData }) => {
  const token = useSelector((state) => state.auth.token);
  const [productPlans, setProductPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(formData.productName);

  useEffect(() => {
    const url = "https://sisos-eu.azurewebsites.net/api/cmd";
    const dataToPost = {
      cmd: "RepoProduct",
      data: { operation: "GET", filter: "code='GLE'" },
    };

    const fetchProductPackages = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToPost),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const product = data.outData[0];
        const productConfig = JSON.parse(product.configJson);
        const productPlans = productConfig.Plans || [];
        setProductPlans(productPlans);
      } catch (error) {
        setError(true);
        console.error("Error fetching product packages: ", error);
      }
      setLoading(false);
    };

    if (productPlans.length === 0) {
      fetchProductPackages();
    }
  }, [token, productPlans]);

  const handleSelect = (name, benefit) => {
    setFormData({
      ...formData,
      productName: name,
      benefitAmount: benefit,
    });
    setSelectedPackage(name);
  };

  if (error) {
    return (
      <ErrorPage
        status="error"
        title="Failed to Fetch Product Packages"
        subtitle="Sorry, there was an issue fetching the product packages. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <div className="w-[710px] h-[76px] top-[408px] left-[425px] mt-3 mb-10 py-3 px-0 flex flex-col gap-1">
        <p className="font-open-sans text-[16px] font-semibold leading-[28px] text-left">
          Please select your preferred product package.
        </p>
        <p className="text-sm font-normal font-open-sans text-left text-[#929497]">
          The benefit covers the principal member and selected family members.
        </p>
      </div>

      <Form form={form} className="mb-10">
        {loading ? (
          <Row gutter={[16, 16]}>
            {[...Array(8)].map((_, index) => (
              <Col key={index} xs={24} sm={12} lg={8}>
                <Skeleton active />
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            {productPlans.map((pkg, index) => (
              <ProductPackage
                key={index}
                name={pkg.name}
                benefit={pkg.sumInsured}
                onSelect={handleSelect}
                selected={pkg.name === selectedPackage}
              />
            ))}
          </Row>
        )}
      </Form>
    </>
  );
};

export default ProductPackagesForm;
