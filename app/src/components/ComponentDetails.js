import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import { StyledRow } from "./NewComponent";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ComponentsChartDetails } from "./ComponentsChartDetails";

export const Wrapper = styled(Container)`
  padding-top: 25px;
  padding-bottom: 25px;
`;
const ComponentDetails = props => {
  const { componentId, description, id, emails, phases } = props.location.state;
  return (
    props.location.state && (
      <Wrapper>
        <div>
          <Label for="id">Id: </Label>
          <Input
            placeholder="id"
            type="text"
            name="id"
            id="id"
            value={id}
            readOnly
          />
        </div>
        <div>
          <Label for="componentId">Component Id: </Label>
          <Input
            placeholder="Component id"
            type="text"
            name="componentId"
            id="componentId"
            value={componentId}
            readOnly
          />
        </div>
        <div>
          <Label for="description">Description: </Label>
          <Input
            placeholder="Description"
            type="text"
            name="description"
            id="description"
            value={description}
            readOnly
          />
        </div>
        <div>
          <Label for="emails">Responsible persons e-mails: </Label>
          {emails && (
            <Row>
              <ul>
                {emails.split(";").map(person => {
                  return (
                    <StyledRow>
                      <Col>
                        <li>{person}</li>
                      </Col>
                    </StyledRow>
                  );
                })}
              </ul>
            </Row>
          )}
        </div>
        <hr />
        <div>
          <Label for="phases">Phases:</Label>
          {phases && phases.length > 0 && (
            <Row>
              <ul>
                {phases.map(phase => {
                  return (
                    <StyledRow>
                      <Col>
                        <li>
                          Name: {phase.name}
                          <br />
                          Date from: {phase.dateFrom}
                          <br />
                          Date to: {phase.dateTo}
                          <br />
                          Requirements: {phase.requirements}
                        </li>
                      </Col>
                    </StyledRow>
                  );
                })}
              </ul>
            </Row>
          )}
        </div>
        <div>
          <ComponentsChartDetails component={props.location.state} />
        </div>
        <div>
          <Button color="secondary" tag={Link} to="/components">
            Back to dashboard
          </Button>
        </div>
      </Wrapper>
    )
  );
};

export default connect(
  null,
  null
)(ComponentDetails);
