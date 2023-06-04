import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import businessProfileService from "../../services/businessProfileService";
import debug from "sabio-debug";
import toastr from "toastr";

const _logger = debug.extend("BusinessProfileConfirm");

function BusinessProfileConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { updatedBusinessProfile, lookUps },
  } = location;
  _logger("updatedBusinessProfile", updatedBusinessProfile);

  const handleSubmit = () => {
    businessProfileService.addBusinessProfile(updatedBusinessProfile).then(onAddBusinessProfileSuccess).catch(onAddBusinessProfileError);
  };

  const onAddBusinessProfileSuccess = (response) => {
    _logger("Business added: ", response);
    toastr.success(`Success! Business added. Id: ${response.item}`);
    setTimeout(() => {
      navigate(`/profiles/business/`);
    }, 1000);
  };

  const onAddBusinessProfileError = (error) => {
    _logger("Error. Business not added: ", error);
    toastr.error("Error. Business not added.");
  };

  const handleEdit = () => {
    businessProfileService.updateBusinessProfile(updatedBusinessProfile.id, updatedBusinessProfile).then(onUpdateBusinessProfileSuccess).catch(onUpdateBusinessProfileError);
  };
  _logger(handleEdit, updatedBusinessProfile);

  const onUpdateBusinessProfileSuccess = (response) => {
    _logger("Business updated: ", response);
    toastr.success(`Success! Business updated. Id: ${response.item}`);
    setTimeout(() => {
      navigate(`/profiles/business/`);
    }, 1000);
  };

  const onUpdateBusinessProfileError = (error) => {
    _logger("Error. Business not updated: ", error);
    toastr.error("Error. Business not updated.");
  };

  const goBack = () => {
    _logger("Go back...");
    if (updatedBusinessProfile.shouldEdit) navigate(`/profiles/business/${updatedBusinessProfile.id}/edit`, { state: { updatedBusinessProfile, lookUps } });
    else navigate("/profiles/business/create", { state: { updatedBusinessProfile, lookUps } });
  };

  const getStatusType = () => {
    let statusId = null;
    if (typeof updatedBusinessProfile.statusId === "string") {
      statusId = Number(updatedBusinessProfile.statusId);
    } else {
      statusId = updatedBusinessProfile.statusId;
    }

    let updatedIndex = null;
    switch (statusId) {
      case 3:
        updatedIndex = statusId - 2;
        break;
      default:
        updatedIndex = statusId - 1;
    }
    return lookUps.statusTypes[updatedIndex].name;
  };

  return (
    <React.Fragment>
      <div className="py-4 py-lg-6 bg-primary">
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-white mb-1">Confirm Business Details</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="border-primary">
        <Card className="col-md-5 mx-auto p-5 my-3">
          <Card.Header className="d-flex">
            <h4>Please confirm the details below are correct: </h4>
          </Card.Header>
          <h4 className="px-4 pt-3">Logo: </h4>
          <Card.Header className="d-flex justify-content-center pb-5">
            <img src={updatedBusinessProfile?.logo} className="col-5 mx-auto p-2 img-thumbnail img-fluid rounded-circle" alt="businessProfileLogo" />
          </Card.Header>
          <Card.Header>
            <h4>Business Name: </h4>
            <div>{updatedBusinessProfile.name}</div>
          </Card.Header>
          <Card.Header>
            <h4>EIN: </h4>
            <div>{updatedBusinessProfile?.ein}</div>
          </Card.Header>
          <Card.Header>
            <h4>Status: </h4>
            <div>{getStatusType()}</div>
          </Card.Header>
          <Card.Header>
            <h4>Business Type: </h4>
            <div>
              {lookUps.businessTypes[typeof updatedBusinessProfile.businessTypeId === "string" ? Number(updatedBusinessProfile.businessTypeId - 1) : updatedBusinessProfile.businessTypeId - 1]?.name}
            </div>
          </Card.Header>
          <Card.Header>
            <h4>Industry Type: </h4>
            <div>
              {lookUps.industryTypes[typeof updatedBusinessProfile.businessStageId === "string" ? Number(updatedBusinessProfile.industryTypeId - 1) : updatedBusinessProfile.industryTypeId - 1]?.name}
            </div>
          </Card.Header>
          <Card.Header>
            <h4>Projected Annual Business Income: </h4>
            {updatedBusinessProfile?.projectedAnnualBusinessIncome ? `$${updatedBusinessProfile?.projectedAnnualBusinessIncome.toLocaleString()}` : "N/A"}
          </Card.Header>
          <Card.Header>
            <h4>Annual Business Income: </h4>${typeof updatedBusinessProfile.annualBusinessIncome === "number" ? updatedBusinessProfile.annualBusinessIncome.toLocaleString() : "N/A"}
          </Card.Header>
          <Card.Header>
            <h4>Business Stage: </h4>
            <div>
              {
                lookUps.businessStages[typeof updatedBusinessProfile.businessStageId === "string" ? Number(updatedBusinessProfile.businessStageId - 1) : updatedBusinessProfile.businessStageId - 1]
                  ?.name
              }
            </div>
          </Card.Header>
          <Card.Header>
            <h4>Location: </h4>
            <div>{updatedBusinessProfile?.locationId}</div>
          </Card.Header>
          <div className="button-group text-center mt-3">
            <button type="button" className="btn btn-secondary mx-2" onClick={goBack}>
              BACK
            </button>
            {updatedBusinessProfile.shouldEdit ? (
              <button type="submit" className="btn btn-warning" onClick={handleEdit}>
                UPDATE
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                CONFIRM & SUBMIT
              </button>
            )}
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default BusinessProfileConfirm;
