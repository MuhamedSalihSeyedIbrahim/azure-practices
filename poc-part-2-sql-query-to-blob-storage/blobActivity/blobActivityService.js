//blobActivityService.js

const {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const {
  AZURE_STORAGE_CONNECTION_STRING,
  CONTAINER_NAME,
  ACCOUNT_KEY,
  ACCOUNT_NAME,
} = require("./config");
const json2xls = require("json2xls");

const connection = async () => {
  // Create the BlobServiceClient object which will be used to create a container client

  const blobServiceClient = await BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = await blobServiceClient.getContainerClient(
    CONTAINER_NAME
  );

  return containerClient;
};

const createBlobfromJSON = (queryResult) => {
  // Create a unique name for the blob
  const blobName = "temp" + uuidv1() + ".xlsx";
  let generatedBlob = json2xls(queryResult, {});
  generatedBlob = Buffer.from(generatedBlob, "binary");

  return { blobName, generatedBlob };
};

const getBlobTempPublicUrl = (containerName, blockBlobClient, blobName) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    ACCOUNT_NAME,
    ACCOUNT_KEY
  );
  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerName,
      blobName: blobName,
      expiresOn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      permissions: BlobSASPermissions.parse("racwd"),
    },
    sharedKeyCredential
  ).toString();

  const sasUrl = `${blockBlobClient.url}?${sasToken}`;
  return sasUrl;
};

const uploadBlob = async (blockBlobClient, generatedBlob) => {
  // Upload data to the blob
  const uploadBlobResponse = await blockBlobClient.upload(
    generatedBlob,
    generatedBlob.length
  );

  return uploadBlobResponse;
};

module.exports = async function (queryResult) {
  //Get connections
  const containerClient = await connection();

  //create blob from queried data
  const { blobName, generatedBlob } = createBlobfromJSON(queryResult);

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobStatus = await uploadBlob(blockBlobClient, generatedBlob);

  const BlobUrl = getBlobTempPublicUrl(
    CONTAINER_NAME,
    blockBlobClient,
    blobName
  );

  return BlobUrl;
};
