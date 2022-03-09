import { AppService } from './service';
import * as _ from 'underscore';
import * as fs from 'fs';

import { filePath, fileChunkLimit, outputFilePath } from '../config/config.json';
import { schema } from './schema/schema';

/**
 * Application handler.
 */
class AppController {
    /**
     * excelToDb handler.
     */
    async excelToDb() {
        //Service call.
        const appService: AppService = new AppService(),
            parsedExcelData: Array<any> = await appService.parseExcel(filePath, schema),
            //chunk wise save all record (promise method)
            excelDataChunkArrayStatus: Array<Promise<any>> = _.chunk(
                parsedExcelData,
                fileChunkLimit,
            )?.map(async (chunk: Array<any>) => appService.saveAllRecords(chunk));

    }

    async excelToFile() {
        //Service call.
        const appService: AppService = new AppService(),
            parsedExcelData: Array<any> = await appService.parseExcel(filePath, schema);

        if (!outputFilePath) throw new Error(`Kindly provide output file path.`);
        appService.writeToFile(parsedExcelData, outputFilePath);
    }
}
export { AppController };