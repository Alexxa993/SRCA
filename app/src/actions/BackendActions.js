import { AppStore } from "../index";
import history from "../history";

export const BackendAction = {
  GET_COMPONENTS: "GET_COMPONENTS",
  GET_COMPONENT: "GET_COMPONENT",
  COMPONENT_CREATED: "COMPONENT_CREATED"
};

export const saveComponent = data => {
  fetch("/srca/component", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(
      result => {
        if (result.status === 200) {
          history.push(`/components`);
          AppStore.dispatch({
            type: BackendAction.COMPONENT_CREATED,
            payload: result
          });
        } else {
          history.push(`/error`, result.message);
        }
      },
      error => {
        console.log("An error has occured", error);
        history.push(`/error`);
      }
    );
};

export const getComponents = () => {
  fetch("/srca/components")
    .then(res => res.json())
    .then(
      result => {
        AppStore.dispatch({
          type: BackendAction.GET_COMPONENTS,
          payload: result
        });
      },
      error => {
        console.log("An error has occured");
        history.push(`/error`);
      }
    );
};

export const getComponent = id => {
  fetch(`/srca/component/${id}`)
    .then(res => res.json())
    .then(
      result => {
        history.push(`/component/${id}`);
        AppStore.dispatch({
          type: BackendAction.GET_COMPONENT,
          payload: result
        });
        console.log(result);
      },
      error => {
        console.log("An error has occured");
        history.push(`/error`);
      }
    );
};
