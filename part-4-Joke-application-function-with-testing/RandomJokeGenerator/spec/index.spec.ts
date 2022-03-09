import { JokeAPI } from "../RandomJokeGenratorDataType";
import { Context, Logger } from "@azure/functions";
import axios, { AxiosResponse } from "axios";
import { mocked } from "ts-jest/dist/util/testing"; //<-- This allows to mock results

import httpTrigger from "../index";

import { mockContext, axiosMockData } from "./mockData";
jest.mock("axios");

describe("Random Joke Genrator test Suite 1", () => {
  it("Index function return context back with response", async () => {
    const axiosResponse: AxiosResponse = {
      ...axiosMockData,
      status: 200,
      statusText: "OK",
      config: {},
      headers: {},
    };

    mocked(axios).mockResolvedValue(axiosResponse); //Mocking axios function rather than a method

    const Return: any = await httpTrigger(mockContext);
    expect(Return.res.body.includes("Your Random Joke is :")).toBe(true);
  });
});

test("Index function mock axios", async () => {
  const axiosResponse: AxiosResponse = {
    ...axiosMockData,
    status: 200,
    statusText: "OK",
    config: {},
    headers: {},
  };

  mocked(axios).mockResolvedValue(axiosResponse); //Mocking axios function rather than a method

  const Return: any = await httpTrigger(mockContext);
  expect(Return.res.body.includes("tada mock")).toBe(true);
});
