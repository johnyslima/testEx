import { useRef } from "react";

import { model, params } from "./constants";
import ParamEditor from "./ParamEditor";
import "./App.css";

function App() {
  const ref = useRef<ParamEditor>(null);
  const handleGetModel = () => {
    const model = ref.current?.getModel();
    console.info(model);
    alert(JSON.stringify(model));
  };
  return (
    <>
      <ParamEditor ref={ref} params={params} model={model} />
      <button className="btn" onClick={handleGetModel}>
        Показать
      </button>
    </>
  );
}

export default App;
