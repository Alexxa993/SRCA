import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import { getComponents } from "../actions/BackendActions";
import styled from "styled-components";
import history from "../history";

export const TableWrapper = styled("div")`
  margin-top: 40px;
`;

const Dashboard = props => {
  const { components, getComponents } = props;
  useEffect(() => {
    const { getComponents } = props;
    getComponents();
  }, []);
  return (
    <div>
      <Container fluid>
        <TableWrapper>
          {components && components.length > 0 && (
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Component Id</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {components.map(cmp => (
                  <tr>
                    <td>{cmp.id}</td>
                    <td>{cmp.componentId}</td>
                    <td>{cmp.description}</td>
                    <td>
                      <Button
                        color="success"
                        className="float-right"
                        onClick={() => {
                          history.push(`/component/${cmp.id}`, cmp);
                        }}
                      >
                        More details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
      </Container>
    </div>
  );
};

const mapDispatchToProps = () => {
  return {
    getComponents
  };
};

const mapStateToProps = state => {
  return {
    components: state.BackendReducer.components
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
