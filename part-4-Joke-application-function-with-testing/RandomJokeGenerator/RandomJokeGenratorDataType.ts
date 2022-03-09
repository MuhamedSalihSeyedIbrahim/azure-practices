export interface JokeAPI {
  id?: Number;
  data: {
    type: String;
    value: {
      id: Number;
      joke: String;
      categories: [String];
    };
  };
}
