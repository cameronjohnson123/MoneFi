import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import debug from "sabio-debug";
import { FaBuilding, FaMoneyBill, FaLocationArrow } from "react-icons/fa";
import Loki from "react-loki";
import BusinessDetailsForm from "./steps/BusinessDetailsForm";
import BusinessFinancesForm from "./steps/BusinessFinancesForm";
import BusinessAdditionalDetailsForm from "./steps/BusinessAdditionalDetailsForm";
import "./loki-styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import lookUpService from "services/lookUpService";

const _logger = debug.extend("BusinessProfileCreate");

function BusinessProfileCreate() {
  const [newBusinessProfile, setNewBusinessProfile] = useState({
    name: "",
    ein: null,
    statusId: 0,
    businessTypeId: 0,
    industryTypeId: 0,
    projectedAnnualBusinessIncome: null,
    annualBusinessIncome: null,
    businessStageId: null,
    logo: "",
    locationId: null,
    shouldEdit: false,
  });
  const [lookUps, setLookUps] = useState({
    businessTypes: [],
    industryTypes: [],
    businessStages: [],
    statusTypes: [],
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let stateFromDetails = null;
    if (location.state && location.state.detail) {
      stateFromDetails = location.state.detail;
      stateFromDetails.shouldEdit = true;
      setNewBusinessProfile((prevState) => {
        var updatedStateFromDetails = { ...prevState };
        updatedStateFromDetails = stateFromDetails;
        updatedStateFromDetails.businessTypeId = stateFromDetails.businessType.id;
        updatedStateFromDetails.businessStageId = stateFromDetails.businessStage.id;
        updatedStateFromDetails.industryTypeId = stateFromDetails.industryType.id;
        updatedStateFromDetails.statusId = stateFromDetails.statusType.id;
        _logger("passed state from details for EDIT: ", updatedStateFromDetails);
        return updatedStateFromDetails;
      });
    }
    lookUpService.getTypes(["BusinessTypes", "IndustryTypes", "BusinessStages", "StatusTypes"]).then(onLookUpServiceSuccess).catch(onLookUpServiceError);

    let stateFromBusinessProfileConfirm = null;
    if (location.state && location.state.updatedBusinessProfile) {
      _logger("state back from confirm page", location.state.updatedBusinessProfile);
      stateFromBusinessProfileConfirm = location.state.updatedBusinessProfile;
      setNewBusinessProfile((prevState) => {
        var busProfile = {
          ...prevState,
        };
        busProfile = stateFromBusinessProfileConfirm;
        return busProfile;
      });
    }
  }, []);

  const onLookUpServiceSuccess = (response) => {
    if (response.item)
      setLookUps({
        businessTypes: response.item.businessTypes,
        industryTypes: response.item.industryTypes,
        businessStages: response.item.businessStages,
        statusTypes: [response.item.statusTypes[0], response.item.statusTypes[2]],
      });
  };

  const onLookUpServiceError = (err) => {
    _logger("onLookUpServiceError: ", err);
  };

  const handleNext = (values) => {
    setNewBusinessProfile((prevState) => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const handleBack = () => {
    setNewBusinessProfile((prevState) => {
      return {
        ...prevState,
      };
    });
  };

  const lokiSteps = [
    {
      label: "Step 1",
      icon: <FaBuilding className="mt-3" />,
      component: <BusinessDetailsForm state={newBusinessProfile} lookUps={lookUps} />,
    },
    {
      label: "Step 2",
      icon: <FaMoneyBill className="mt-3" />,
      component: <BusinessFinancesForm state={newBusinessProfile} />,
    },
    {
      label: "Step 3",
      icon: <FaLocationArrow className="mt-3" />,
      component: <BusinessAdditionalDetailsForm state={newBusinessProfile} lookUps={lookUps} />,
    },
  ];

  const lokiFinished = (values) => {
    const updatedBusinessProfile = {
      ...newBusinessProfile,
      ...values,
    };
    navigate("/profiles/business/create/confirm", { state: { updatedBusinessProfile, lookUps } });
  };

  const onBusinessProfilesClicked = (e) => {
    e.preventDefault();

    _logger("Go back...");
    navigate("/profiles/business");
  };

  return (
    <React.Fragment>
      <div className="py-4 py-lg-6 bg-primary">
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-white mb-1">Add New Business Profile</h1>
                  <p className="mb-0 text-white lead">Just fill the form and create your business.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Button className="text-right" variant="link" onClick={onBusinessProfilesClicked}>
        {`<- Business Profiles`}
      </Button>
      <div className="d-flex justify-content-center p-5">
        <div className="col-lg-6 col-md-10 col-sm-10 col-12">
          <Card className="p-5">
            <div className="container">
              <Loki steps={lokiSteps} onNext={handleNext} onBack={handleBack} onFinish={lokiFinished} noActions />
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BusinessProfileCreate;
