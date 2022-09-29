//@ts-nocheck
import { useReducer, useEffect } from "react";
import "./App.css";

enum DATA_STRUCTURE {
  STACK = "stack",
  QUEUE = "queue",
}

enum ACTIONS {
  INPUT_UPDATE = "INPUT_UPDATE",
  DS_UPDATE = "DS_UPDATE",
  INSERT = "INSERT",
  REMOVE = "REMOVE",
}

interface IState {
  input: string;
  ds: DATA_STRUCTURE;
  data: string[];
}

interface IAction {
  type: ACTIONS;
  payload?: string;
}

let globalKey = 0;

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case ACTIONS.DS_UPDATE: {
      return { ...state, ds: action.payload || state.ds };
    }
    case ACTIONS.INPUT_UPDATE: {
      return { ...state, input: action.payload };
    }
    case ACTIONS.INSERT: {
      const updatedData = [...state.data];
      updatedData.push(state.input);
      return { ...state, data: updatedData, input: "" };
    }
    case ACTIONS.REMOVE: {
      if (state.data.length === 0) return state;
      const updatedData = [...state.data];

      if (state.ds === DATA_STRUCTURE.STACK) {
        updatedData.pop();
      } else {
        updatedData.shift();
      }

      return { ...state, data: updatedData };
    }
    default: {
      throw new Error("NO VALID ACTION PROVIDED");
    }
  }
}

function App() {
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, {
    input: "",
    ds: DATA_STRUCTURE.STACK,
    data: new Array<string>(),
  });

  function insertInput() {
    if (state.input === "") return;
    dispatch({ type: ACTIONS.INSERT });
  }

  function popFromData() {
    dispatch({ type: ACTIONS.REMOVE });
  }

  useEffect(() => {
    console.log(state.data);
  }, [state.data]);

  return (
    <div className="flex items-center justify-center flex-col bg-slate-400 h-screen w-screen gap-8">
      <div id="input-form" className="flex gap-2">
        <input
          type={"text"}
          placeholder="input here.."
          className="p-3 rounded"
          value={state.input}
          onChange={(e) =>
            dispatch({ type: ACTIONS.INPUT_UPDATE, payload: e.target.value })
          }
        />
        <select
          name="ds"
          id="ds"
          className="p-3 rounded"
          value={state.ds}
          onChange={(e) =>
            //@ts-ignore
            dispatch({ type: ACTIONS.DS_UPDATE, payload: e.target.value })
          }
        >
          {["stack", "queue"].map((structure) => (
            <option key={structure} value={structure}>
              {structure}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded cursor-pointer"
          onClick={insertInput}
        >
          Insert
        </button>
        <button
          onClick={popFromData}
          className="bg-red-500 text-white px-6 py-3 rounded"
        >
          POP!
        </button>
      </div>
      <section id="storage-visual">
        <div className="h-[200px] w-[600px] border-black border flex justify-end items-center px-2 gap-2">
          {state.data.map((item) => (
            <div key={globalKey++} className="h-[180px] w-[50px] bg-orange-600">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
