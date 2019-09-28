import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import { saveComponent } from "../actions/BackendActions";

export const StyledContainer = styled(Container)`
  margin-top: 38px;
  outline-style: auto;
`;

export const FormWrapper = styled(Container)`
  padding-top: 25px;
  padding-bottom: 25px;
`;

export const StyledRow = styled(Row)`
  margin-top: 10px;
  font-size: 18px;
  width: 425px;
`;

export const FORMAT = "MM/dd/yyyy";

const NewComponent = props => {
  const { saveComponent } = props;
  const [componentId, setComponentId] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [phases, setPhases] = useState([]);
  const [isMailValid, setIsMailValid] = useState(true);
  const [isComponentIdValid, setComponentIdValid] = useState(true);
  const [isDescriptionValid, setDescriptionValid] = useState(true);
  const [phase, setPhase] = useState(null);
  const [isPhaseNameValid, setPhaseNameValid] = useState(true);

  const validateAndSaveComponent = data => {
    if (componentId == null || componentId == undefined || componentId == "") {
      setComponentIdValid(false);
    } else if (
      description == null ||
      description == undefined ||
      description == ""
    ) {
      setDescriptionValid(false);
    } else {
      setComponentIdValid(true);
      setDescriptionValid(true);
      saveComponent(data);
    }
  };

  const validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const removeEmail = person => {
    setEmails(emails.filter(p => p !== person));
  };

  const addNewMail = () => {
    const valid = validateEmail(email);
    if (valid) {
      setEmails([...emails, email]);
      setEmail("");
      setIsMailValid(true);
    } else {
      setIsMailValid(false);
    }
  };

  const removePhase = name => {
    setPhases(phases.filter(p => p && p.name !== name));
  };

  const addNewPhase = () => {
    if (
      phase == null ||
      phase.name == null ||
      phase.name == undefined ||
      phase.name == ""
    ) {
      setPhaseNameValid(false);
    } else {
      setPhaseNameValid(true);
      setPhases([...phases, phase]);
      setPhase(null);
    }
  };

  const formatDate = (date, format) => {
    return (isValidDate(date) && dateFnsFormat(date, format)) || null;
  };

  const showAlert = message => <Alert color="danger">{message}</Alert>;

  const isValidDate = d => {
    return d instanceof Date && !isNaN(d);
  };

  return (
    <div>
      <StyledContainer>
        <FormWrapper>
          <Form>
            <FormGroup>
              <Label for="componentId">Component Id: </Label>
              <Input
                placeholder="Component id"
                type="text"
                name="componentId"
                id="componentId"
                value={componentId}
                onChange={event => setComponentId(event.target.value)}
              />
              {!isComponentIdValid &&
                showAlert("The component id is required.")}
            </FormGroup>
            <FormGroup>
              <Label for="description">Description: </Label>
              <Input
                placeholder="Description"
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
              {!isDescriptionValid && showAlert("The description is required.")}
            </FormGroup>
            <FormGroup>
              <Label for="emails">Responsible persons e-mails: </Label>
              <Row>
                <Col>
                  <Input
                    placeholder="Responsible persons"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                  {!isMailValid &&
                    showAlert(
                      "This email is not valid. Please enter a valid mail."
                    )}
                </Col>
                <Col>
                  <Button
                    color="success"
                    onClick={() => {
                      addNewMail();
                    }}
                  >
                    Add email
                  </Button>
                </Col>
              </Row>
              {emails && emails.length > 0 && (
                <Row>
                  <ul>
                    {emails.map(person => {
                      return (
                        <StyledRow>
                          <Col>
                            <li>{person}</li>
                          </Col>
                          <Col>
                            <Button close onClick={() => removeEmail(person)}>
                              X
                            </Button>
                          </Col>
                        </StyledRow>
                      );
                    })}
                  </ul>
                </Row>
              )}
            </FormGroup>
            <hr />
            <FormGroup>
              <Label for="phases">Phases:</Label>
              <Row>
                <Col>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    value={(phase && phase.name) || ""}
                    onChange={event =>
                      setPhase({ ...phase, name: event.target.value })
                    }
                  />
                  {!isPhaseNameValid &&
                    showAlert("The component id is required.")}
                </Col>
                <Col>
                  <DayPickerInput
                    onDayChange={day => {
                      setPhase({
                        ...phase,
                        dateFrom: formatDate(day, FORMAT)
                      });
                    }}
                    selectedDay={(phase && phase.dateFrom) || ""}
                    placeholder="Date from: "
                  />
                </Col>
                <Col>
                  <DayPickerInput
                    onDayChange={day => {
                      setPhase({
                        ...phase,
                        dateTo: formatDate(day, FORMAT)
                      });
                    }}
                    selectedDay={phase && phase.dateTo}
                    placeholder="Date to:"
                  />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <textarea
                        placeholder="Requirements: "
                        name="requirement"
                        id="requirement"
                        value={(phase && phase.requirements) || ""}
                        onChange={event =>
                          setPhase({
                            ...phase,
                            requirements: event.target.value
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button
                    color="success"
                    onClick={() => {
                      addNewPhase();
                    }}
                  >
                    Add phase
                  </Button>
                </Col>
              </Row>
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
                              Date from: {phase.from}
                              <br />
                              Date to: {phase.to}
                              <br />
                              Requirements: {phase.requirements}
                            </li>
                          </Col>
                          <Col>
                            <Button
                              close
                              onClick={() => removePhase(phase.name)}
                            >
                              X
                            </Button>
                          </Col>
                        </StyledRow>
                      );
                    })}
                  </ul>
                </Row>
              )}
            </FormGroup>
            <hr />
            <Row>
              <Col className="col-md-2">
                <Button
                  color="success"
                  onClick={() =>
                    validateAndSaveComponent({
                      componentId,
                      description,
                      emails: emails.join(";"),
                      phases
                    })
                  }
                >
                  Save
                </Button>
              </Col>
              <Col className="col-md-2">
                <Button color="secondary" tag={Link} to="/components">
                  Back to dashboard
                </Button>
              </Col>
            </Row>
          </Form>
        </FormWrapper>
      </StyledContainer>
    </div>
  );
};

const mapDispatchToProps = () => {
  return {
    saveComponent
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewComponent);
