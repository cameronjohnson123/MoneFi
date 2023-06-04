import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { Button, Container, Row, Col, Card, ListGroup, Tab, Nav } from "react-bootstrap";
import businessProfileService from "../../services/businessProfileService";
import { PropTypes } from "prop-types";
import debug from "sabio-debug";
import toastr from "toastr";
import LocationMap from "./LocationMap";

const _logger = debug.extend("BusinessProfileDetails");

function BusinessProfileDetails() {
  const [aBusinessProfile, setBusinessProfile] = useState({
    id: null,
    userId: null,
    name: "",
    ein: null,
    statusType: {
      id: null,
      name: "",
    },
    businessType: {
      id: null,
      name: "",
    },
    industryType: {
      id: null,
      name: "",
    },
    projectedAnnualBusinessIncome: null,
    annualBusinessIncome: null,
    businessStage: {
      id: null,
      name: "",
      value: null,
    },
    logo: "",
    locationId: null,
    city: "",
    dateCreated: "",
    dateModified: "",
  });
  _logger(aBusinessProfile);
  const { id: businessProfileId } = useParams();
  const navigate = useNavigate();
  const dateFormatted = new Date(aBusinessProfile.dateCreated).toDateString();

  const location = useLocation();
  _logger("useLocation: ", location);

  useEffect(() => {
    let stateFromBusinessProfile = null;

    if (location.state && location.state.detail) {
      stateFromBusinessProfile = location.state.detail;
      setBusinessProfile((prevState) => {
        var busProfile = {
          ...prevState,
        };
        busProfile = stateFromBusinessProfile;
        return busProfile;
      });
    } else {
      businessProfileService.getBusinessProfileById(businessProfileId).then(getBusinessProfileByIdSuccess).catch(getBusinessProfileByIdError);
    }
  }, []);

  const getBusinessProfileByIdSuccess = (data) => {
    let aBusinessProfile = data?.item;
    if (aBusinessProfile) {
      setBusinessProfile((prevState) => {
        var busProfile = {
          ...prevState,
        };
        busProfile = aBusinessProfile;
        return busProfile;
      });
    }
  };

  const getBusinessProfileByIdError = (error) => {
    _logger("getBusinessProfileByIdError error", error);
    toastr.error("Error. Failed to load business profile.", error);
  };

  const onBusinessProfilesClicked = (e) => {
    e.preventDefault();

    _logger("Go back...");
    navigate("/profiles/business");
  };

  return (
    <React.Fragment>
      <Col lg={12} md={12} sm={12}>
        <div>
          <Button className="text-right" variant="link" onClick={onBusinessProfilesClicked}>
            {`<- Business Profiles`}
          </Button>
        </div>
      </Col>
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">Business Profile Details</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="pb-10">
        <Container>
          <Row>
            <Col lg={8} md={12} className="mt-n14 mb-4 mb-lg-0">
              <Tab.Container defaultActiveKey="details">
                <Card>
                  <Nav className="nav-lb-tab">
                    {["Details", "Earnings", "Location"].map((item, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link href={`#${item.toLowerCase()}`} eventKey={item.toLowerCase()} className="mb-sm-3 mb-md-0">
                          {item}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="details" className="pb-4 p-4">
                        <h2>{aBusinessProfile.name}</h2>
                        <Card.Header>
                          <h4>Business Type: </h4>
                          {aBusinessProfile.businessType.name}
                        </Card.Header>
                        <Card.Header>
                          <h4>Industry Type: </h4> {aBusinessProfile.industryType.name}
                        </Card.Header>
                        <Card.Header>
                          <h4>Business Stage: </h4>
                          {aBusinessProfile.businessStage.name}
                        </Card.Header>
                        <Card.Header>
                          <h4>EIN: </h4>
                          {aBusinessProfile.ein}
                        </Card.Header>
                      </Tab.Pane>
                      <Tab.Pane eventKey="earnings" className="pb-4 p-4">
                        <h2>{aBusinessProfile.name}</h2>

                        <Card.Header>
                          <h4>Projected Annual Business Income: </h4>
                          {aBusinessProfile?.projectedAnnualBusinessIncome ? `$${aBusinessProfile?.projectedAnnualBusinessIncome.toLocaleString()}` : "N/A"}
                        </Card.Header>
                        <Card.Header>
                          <h4>Annual Business Income: </h4>${typeof aBusinessProfile.annualBusinessIncome === "number" ? aBusinessProfile.annualBusinessIncome.toLocaleString() : "N/A"}
                        </Card.Header>
                      </Tab.Pane>
                      <Tab.Pane eventKey="location" className="pb-4 p-4">
                        <h2>{aBusinessProfile.name}</h2>
                        <Card.Header>
                          <h4>City: </h4>
                          {aBusinessProfile.city}
                          <LocationMap lat={32.7157} long={-117.1611} />
                        </Card.Header>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n22">
              <Card className="mb-3 mb-4">
                <div className="mx-auto img-fluid p-3">
                  <img src={aBusinessProfile.logo} className="img-thumbnail img-fluid" alt="BusinessLogo" />
                </div>
                <Card.Body>
                  <h3>{aBusinessProfile.name}</h3>

                  <div className="my-4">
                    <li className=" h4 me-2">{aBusinessProfile.businessType.name}</li>
                  </div>
                  <div className="my-4">
                    <li className="h4 me-2">{aBusinessProfile.industryType.name}</li>
                  </div>
                  <div className="d-grid">
                    <Link
                      to={{
                        pathname: `/profiles/business/${aBusinessProfile.id}/edit`,
                      }}
                      state={{ detail: aBusinessProfile }}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Header>
                  <h4 className="mb-0">Status</h4>
                </Card.Header>
                <Card.Body className="p-0">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="bg-transparent">
                      <i className="fe fe-clock align-middle me-2 text-warning"></i>
                      {aBusinessProfile.statusType.name}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <i className="fe fe-calendar align-middle me-2 text-info"></i>
                      Created: {dateFormatted}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

BusinessProfileDetails.propTypes = {
  businessProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ein: PropTypes.number,
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    businessType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    industryType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    projectedAnnualBusinessIncome: PropTypes.number,
    annualBusinessIncome: PropTypes.number.isRequired,
    businessStage: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
    logo: PropTypes.string,
    locationId: PropTypes.number,
    city: PropTypes.string,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }).isRequired,
};

export default BusinessProfileDetails;
