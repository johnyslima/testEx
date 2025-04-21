import React from "react";

export interface Param {
  id: number;
  name: string;
  type: string;
}
export interface ParamValue {
  paramId: number;
  value: string;
}
export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
type Color = object;
type State = {
  params: ParamValue[];
  colors: Color[];
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      params: props.params.map((param: Param) => ({
        paramId: param.id,
        value:
          props.model.paramValues.find(
            (item: ParamValue) => item.paramId === param.id
          )?.value || "",
      })),
      colors: props.model.colors,
    };
  }
  public getModel(): Model {
    return {
      paramValues: this.state.params,
      colors: this.state.colors,
    };
  }

  handleEdit = (paramId: number, value: string) => {
    this.setState((state: State) => ({
      params: state.params.map((param: ParamValue) =>
        param.paramId === paramId ? { ...param, value } : param
      ),
    }));
  };

  render() {
    const { params: propsParams } = this.props;
    const { params: stateParams } = this.state;
    return (
      <div>
        {propsParams.map((param: Param) => {
          const findedValue = stateParams.find(
            (item: ParamValue) => item.paramId === param.id
          )?.value;
          const labelInputId = `paramId_${param.id}`;
          return (
            <div key={labelInputId} className="param-wrap">
              <label htmlFor={labelInputId} className="param-label">
                {param.name}:
              </label>
              <input
                id={labelInputId}
                type="text"
                value={findedValue || ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.handleEdit(param.id, event.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ParamEditor;
