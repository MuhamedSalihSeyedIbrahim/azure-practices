import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";

import { JokeAPI } from "./RandomJokeGenratorDataType";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<Context> {
  context.log("HTTP trigger function processed a request.");
  let JOKE: JokeAPI = await axios({
    method: "GET",
    url: "http://api.icndb.com/jokes/random",
  });
  JOKE.id = 0;
  context.log(JOKE?.id);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Your Random Joke is :" + JOKE?.data?.value?.joke,
  };

  return context;
};

export default httpTrigger;
