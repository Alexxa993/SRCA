import React from "react";
import { Alert } from "reactstrap";

export const ErrorComponent = props => {
  return (
    <Alert color="danger">An error has occurred.{props.location.state}</Alert>
  );
};
