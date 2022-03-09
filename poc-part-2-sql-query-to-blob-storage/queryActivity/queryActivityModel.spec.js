const queryActivityModel = require("./queryActivityModel");

jest.mock("@azure/cosmos", () => {
  class CosmosClient {
    CosmosClient(option) {
      return this;
    }
    database() {
      const container = jest.fn().mockImplementation(() => {
        const items = {
          query: jest.fn().mockImplementation(() => {
            const fetchAll = jest.fn().mockImplementation(async () => {
              return new Promise((res, rej) =>
                res({ resources: [{ Hai: "Hello" }] })
              );
            });
            return { fetchAll };
          }),
        };
        return { items };
      });
      return { container };
    }
  }

  return { CosmosClient };
});

describe("Query activity model test suite", () => {
  it("mock cosmos db and verify the output", async () => {
    let context = { bindings: { name: null } };

    const queryActivityModelReturn = await queryActivityModel(context);
    expect(queryActivityModelReturn).toEqual([{ Hai: "Hello" }]);
  });
});
