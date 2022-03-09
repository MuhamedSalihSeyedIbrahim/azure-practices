const blobActivityService = require("./blobActivityService");
jest.mock("json2xls", () => {
  return jest.fn().mockImplementation((args) => "MOCK-STRING");
});
jest.mock("@azure/storage-blob", () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(async () => {
        return new Promise((res, _) =>
          res({
            getContainerClient: jest.fn().mockImplementation(() => {
              return {
                getBlockBlobClient: jest.fn().mockImplementation(() => {
                  return {
                    url: "https://mock-url/",
                    upload: jest.fn().mockImplementation(async () => {
                      return new Promise((res, _) => res("success"));
                    }),
                  };
                }),
              };
            }),
          })
        );
      }),
    },
    generateBlobSASQueryParameters: jest.fn().mockImplementation(() => {
      return "SAS-TOKEN-MOCK";
    }),
    BlobSASPermissions: {
      parse: jest.fn().mockImplementation(() => {
        return " racwd ";
      }),
    },
    StorageSharedKeyCredential: jest.fn().mockImplementation(() => {
      return " SAS-KEY-MOCK ";
    }),
  };
});

describe("Blob activity Service test suite", () => {
  const {
    BlobServiceClient,
    BlobSASPermissions,
    generateBlobSASQueryParameters,
    StorageSharedKeyCredential,
  } = require("@azure/storage-blob");

  let blobActivityServiceReturn;
  beforeAll(async () => {
    blobActivityServiceReturn = await blobActivityService([{ Hai: "Hello" }]);
  });

  afterAll(() => {
    blobActivityServiceReturn = "";
  });

  it("mock blob and verify the output", () => {
    expect(blobActivityServiceReturn).toBe("https://mock-url/?SAS-TOKEN-MOCK");
  });

  it("BlobServiceClient fromConnectionString call count test", () => {
    expect(BlobServiceClient.fromConnectionString.mock.calls.length).toBe(1);
  });

  it("BlobServiceClient generateBlobSASQueryParameters call count test", () => {
    expect(generateBlobSASQueryParameters.mock.calls.length).toBe(1);
  });

  it("BlobServiceClient BlobSASPermissions parse call count test", () => {
    expect(BlobSASPermissions.parse.mock.calls.length).toBe(1);
  });

  it("BlobServiceClient StorageSharedKeyCredential call count test", () => {
    expect(StorageSharedKeyCredential.mock.calls.length).toBe(1);
  });

  it("json2xls data check", () => {
    const json2xls = require("json2xls");
    expect(json2xls.mock.results[0]["value"]).toBe("MOCK-STRING");
  });
});
