//lib imports
import * as fs from "fs";
import * as XLSX from "xlsx";
import * as Cosmos from "@azure/cosmos";
import * as path from "path";

//config imports
import { endpoint, key, databaseId, containerId } from "./config.json";
import { writeTofile, InsertInDb } from "./config.json";
import { inputFilePath as ifp, outputFilePath as ofp } from "./config.json";

//schema import
import { schema } from "./schema";

//If connecting to the Cosmos DB Emulator, disable TLS verification for your node process:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * excel To File will parse the xlsx and write to file
 */
async function excelToFile() {
  const outputFilePath = path.resolve(ofp);
  if (!outputFilePath) throw new Error(`Kindly provide output file path.`);

  const parsedExcelData: Array<any> = await parseExcel(schema),
    schemaMappedexcelData: Array<any> = await excelObjectToSchemaMapper(
      parsedExcelData
    );

  console.log(`Writing to file: ${outputFilePath}...`);
  fs.writeFileSync(
    outputFilePath,
    JSON.stringify(schemaMappedexcelData, null, 4)
  );
  console.log(`Writing to file: ${outputFilePath} completed`);
}

/**
 * batch Insert will create array of promise of insert action &
 * throttle is used to control overflow of http buffer.
 */
async function insertAll(records: Array<any>, _container): Promise<Array<any>> {
  const createStatusResponseArray: Array<any> = new Array<any>();

  for (let recordIndx = 0; recordIndx < records.length; recordIndx++) {
    const {
      item: { id },
      statusCode,
    } = await _container.items.create(records[recordIndx]);
    console.log(
      `${recordIndx + 1}. record inserted |Status: ${statusCode}|ID: ${id}}`
    );
    createStatusResponseArray.push({ statusCode, id });
  }

  return createStatusResponseArray;
}

/**
 * parse the Excel to array of object
 */
async function parseExcel(schema: any): Promise<Array<any>> {
  const inputFilePath = path.resolve(ifp),
    workBook: XLSX.WorkBook = XLSX.readFile(inputFilePath),
    sheetName: string = workBook.SheetNames[0],
    schemaParsedexcelRows: Array<unknown> = XLSX.utils.sheet_to_json(
      workBook.Sheets[sheetName]
    );

  return schemaParsedexcelRows;
}

/**
 *
 * Function to convert array of excel extracted object to desired schema format.
 *
 */
async function excelObjectToSchemaMapper(
  excelData: Array<any>
): Promise<Array<any>> {
  const schemaMappedexcelRows = excelData?.map((row) => schema(row));
  return schemaMappedexcelRows;
}

/**
 * Handle will parse the xlsx using parseExcel &
 * using map | batchInsert to insert to Db.
 */
async function excelToDb(_container) {
  const parsedExcelData: Array<any> = await parseExcel(schema);

  const schemaMappedexcelData: Array<any> = await excelObjectToSchemaMapper(
    parsedExcelData
  );

  const excelDataChunkArrayStatus: Array<Promise<any>> = await insertAll(
    schemaMappedexcelData,
    _container
  );

  return excelDataChunkArrayStatus;
}

/**
 * Main function.
 */
async function main() {
  try {
    console.log(`Application Started : 0ms.`);
    console.time("Application Insert In Db Activity");
    console.time("Application Write To File");

    if (InsertInDb) {
      //DB connection
      const _dbClient = new Cosmos.CosmosClient({ endpoint, key }),
        _database = _dbClient.database(databaseId),
        _container = _database.container(containerId);

      const totalStatius = await excelToDb(_container);
      console.timeEnd("Application Insert In Db Activity");

      if (!writeTofile) return;
    }

    if (writeTofile) {
      await excelToFile();
      console.timeEnd("Application Write To File");
      return;
    }

    console.log(`Kindly enable either write to file or insert to DB in config`);
  } catch (err) {
    console.error(`Error Occured ${err.message}`);
    /**
     * //uncomment if you want to close process once error occur
     * process.exit(1);
     */
  }
}

//intial application start call
main();
