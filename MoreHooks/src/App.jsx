import { useReducer, useRef } from "react";
import "./App.css";

const initialState = [];

const reducer = (state, action) => {
  if (action.type === "AddItem") {
    return [...state, { text: action.payload, isHidden: false }];
  } else if (action.type === "MappedArr") {
    return [...action.payload];
  } else {
    return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();

  const handleToggle = (id) => {
    let mappedArr = state.map((ele, idx) => {
      return id === idx
        ? { text: ele.text, isHidden: !ele.isHidden }
        : ele;
    });
    dispatch({ type: "MappedArr", payload: mappedArr });
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === "Enter")
              dispatch({ type: "AddItem", payload: event.target.value });
          }}
        />
      </div>

      <div className="container">
        {state.map((ele, idx) => (
          <div key={idx} className="item">
            <h3>{ele.isHidden ? "Text is Hidden" : ele.text}</h3>
            <button className="toggleBtn" onClick={() => handleToggle(idx)}>
              Toggle
            </button>
          </div>
        ))}
      </div>

      <div className="container">
        <button onClick={() => inputRef.current.focus()}>
          Focus the input box
        </button>
      </div>
    </>
  );
};

export default App;

