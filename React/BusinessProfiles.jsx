import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import { CardGroup, Button, Container, Row, Col, Card, FormControl, Form, Tab } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import businessProfileService from "../../services/businessProfileService";
import lookUpService from "../../services/lookUpService";
import BusinessProfile from "./BusinessProfile";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import toastr from "toastr";

const _logger = debug.extend("BusinessProfiles");

function BusinessProfiles() {
  const [pageData, setPageData] = useState({
    arrayOfBusinessProfiles: [],
    businessProfilesComponents: [],
    pageIndex: 0,
    totalCount: 0,
    pageSize: 12,
    inputValue: "",
    query: "",
    businessTypeIdQuery: "",
  });
  const [lookUps, setLookUps] = useState({
    businessTypes: [],
    industryTypes: [],
    businessStages: [],
    statusTypes: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (lookUps.businessTypes.length === 0 && lookUps.industryTypes.length === 0 && lookUps.businessStages.length === 0 && lookUps.statusTypes.length === 0) {
      lookUpService.getTypes(["BusinessTypes", "IndustryTypes", "BusinessStages", "StatusTypes"]).then(onLookUpServiceSuccess).catch(onLookUpServiceError);
    }
    businessProfileService
      .searchBusinessProfiles(pageData.pageIndex, pageData.pageSize, pageData.query, pageData.businessTypeIdQuery)
      .then(onGetAllBusinessProfilesSuccess)
      .catch(onGetAllBusinessProfilesError);
  }, [pageData.pageIndex, pageData.query, pageData.businessTypeIdQuery]);

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

  const mapBusinessProfile = (aBusinessProfile) => {
    return <BusinessProfile key={"ListA-" + aBusinessProfile.id} businessProfile={aBusinessProfile} />;
  };

  const onGetAllBusinessProfilesSuccess = (data) => {
    const arrayOfBP = data?.item?.pagedItems;

    if (arrayOfBP) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.totalCount = data.item.totalCount;
        pd.arrayOfBusinessProfiles = arrayOfBP;
        pd.businessProfilesComponents = arrayOfBP.map(mapBusinessProfile);
        _logger("pd", pd);
        return pd;
      });
    }
  };

  const onGetAllBusinessProfilesError = (error) => {
    _logger("onGetAllBusinessProfilesError error", error);
    toastr.error("Error. Failed to load business profiles.", error);
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      const p = { ...prevState };
      p.pageIndex = page - 1;
      return p;
    });
  };

  const onCreateClicked = (e) => {
    e.preventDefault();
    _logger("Go back...");
    navigate("/profiles/business/create");
  };

  const handleSearchChange = (e) =>
    setPageData((prevState) => {
      return {
        ...prevState,
        inputValue: e.target.value,
      };
    });

  const handleSearch = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      return {
        ...prevState,
        query: pageData.inputValue,
      };
    });
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    const selectedFilter = e.target.value;
    setPageData((prevState) => {
      const updatedState = { ...prevState };
      updatedState.businessTypeIdQuery = selectedFilter;
      updatedState.pageIndex = 0;
      _logger(updatedState.businessTypeIdQuery);
      return updatedState;
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      const resetQueries = { ...prevState };
      resetQueries.query = "";
      resetQueries.businessTypeIdQuery = "";
      resetQueries.inputValue = "";
      _logger(resetQueries);
      return resetQueries;
    });
  };

  const mapOptions = (type) => (
    <option key={type.id} value={type.id}>
      {type.name}
    </option>
  );

  return (
    <React.Fragment>
      <div className="py-4 py-lg-6 bg-primary">
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
              <div className="d-lg-flex align-items-center justify-content-between">
                <div className="mb-4 mb-lg-0">
                  <h1 className="text-white mb-1">Business Profiles</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-6 row ">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-4">
            <Row className="d-lg-flex justify-content-between align-items-center">
              <Col md={6} lg={8} xl={9}>
                <h4 className="mb-3 mb-lg-0">Displaying {pageData.totalCount} Business Profiles</h4>
              </Col>
            </Row>
          </Col>
          <Col xl={3} lg={3} md={4} sm={12} className="mb-lg-0">
            <Card>
              <Form onSubmit={handleSearch}>
                <Card.Body>
                  <h4>Filter</h4>
                  <div className="cursor-pointer position-relative d-flex">
                    <span onClick={handleSearch} className="position-absolute top-50 translate-middle-y end-0 me-3">
                      <Icon path={mdiMagnify} size={1} />
                    </span>

                    <FormControl type="text" placeholder="Search" value={pageData.inputValue} onChange={handleSearchChange} />
                  </div>
                  <span className="dropdown-header px-0 mt-3">Business Type</span>
                  <Form>
                    <Form.Select aria-label="Business Type" value={pageData.businessTypeIdQuery} onChange={handleDropdownChange}>
                      <option value="">All Business Types</option>
                      {lookUps.businessTypes.map(mapOptions)}
                    </Form.Select>
                  </Form>
                </Card.Body>
                <div className="w-75 pt-1 d-flex mx-auto">
                  <Button className="w-50 mx-2" variant="outline-secondary" type="submit">
                    Search
                  </Button>
                  <Button className="w-50 mx-2" variant="outline-danger" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Form>
              <Card.Header></Card.Header>
              <div className="w-100 my-4 d-flex justify-content-center">
                <Button className="w-50" variant="success" onClick={onCreateClicked}>
                  + Create
                </Button>
              </div>
            </Card>
          </Col>
          <Col xl={9} lg={9} md={8} sm={12}>
            <Pagination className="py-3 px-3" onChange={onPageChange} current={pageData.pageIndex + 1} total={pageData.totalCount} pageSize={pageData.pageSize} />
            <Tab.Content>
              <CardGroup className="col-md-12 ">{pageData.businessProfilesComponents}</CardGroup>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default BusinessProfiles;
