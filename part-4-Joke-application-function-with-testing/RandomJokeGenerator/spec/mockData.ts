import { Context } from "@azure/functions";
import { JokeAPI } from "../RandomJokeGenratorDataType";

export const mockContext: Context = {
  bindingDefinitions: null,
  done: null,
  invocationId: null,
  executionContext: {
    invocationId: "",
    functionName: "",
    functionDirectory: "",
  },
  bindings: {},
  bindingData: {},
  traceContext: { traceparent: "", tracestate: "", attributes: { x: "" } },
  log: (function () {
    let main = <any>jest.fn((message) => message);

    let info = jest.fn((message) => message);
    main.info = info;

    return main;
  })(),
};

export const axiosMockData: JokeAPI = {
  id: null,
  data: {
    type: "joke",
    value: {
      id: 1,
      joke: "tada mock",
      categories: null,
    },
  },
};
