
import React from "react";
import { Toast as ToastWrapper, ToastBody, ToastHeader } from "reactstrap"

const Ctx = React.createContext();


const ToastContainer = props => (
  <div style={{ position: "fixed", right: 0, top: 0 }} {...props} />
);

const Toast = ({ title, children, onDismiss }) => {
  return (
    <ToastWrapper style={{ margin: 10 }}>
      <ToastHeader toggle={onDismiss}>
        {title}
      </ToastHeader>
      <ToastBody>
        {children}
      </ToastBody>
    </ToastWrapper>
  )
}


let toastCount = 0;

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const add = ({ title, content }) => {
    const id = toastCount++;
    const toast = { title, content, id };
    setToasts([...toasts, toast]);
    return id
  };

  const update = ({id , title, content}) => {
    const toast = { title, content, id };
    setToasts([...toasts, toast]);
    return id
  }

  const remove = id => {
    const newToasts = toasts.filter(t => t.id !== id);
    setToasts(newToasts);
  };
  // avoid creating a new fn on every render
  const onDismiss = id => () => remove(id);

  return (
    <Ctx.Provider value={{ add, remove, update }}>
      {children}
      <ToastContainer>
        {toasts.map(({ title, content, id, ...rest }) => (
          <Toast key={id} title={title} Toast={Toast} onDismiss={onDismiss(id)} {...rest}>
            {content}
          </Toast>
        ))}
      </ToastContainer>
    </Ctx.Provider>
  );
}

export default ToastProvider;


export const useToasts = () => React.useContext(Ctx);
