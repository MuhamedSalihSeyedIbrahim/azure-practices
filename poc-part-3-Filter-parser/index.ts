import { filterParser, parsedFilter } from "./filterParser";
/**
 * vendorName(VENDORNAME1,VENDORNAME2,sad), 
    vendorNameLesser(VENDORNAME1), 
    vendorNameGreater(VENDORNAME1), 
    vendorNameLesserEq(VENDORNAME1), 
    vendorNameGreaterEq(VENDORNAME1), 
    vendorNameBefore(VENDORNAME1), 
    vendorNameAfter(VENDORNAME1), 
    vendorNameBeforeEq(VENDORNAME1),
    vendorNameAfterEq(VENDORNAME1),


    `vendorName(l,kmk),vendorNameLesser(hv),vendorNameGreater(VENDORNAME12),vendorNameLesserEq(VENDORNAME13),vendorNameGreaterEq(VENDORNAME14),vendorNameBefore(VENDORNAME15),vendorNameAfter(VENDORNAME16),vendorNameBeforeEq(VENDORNAME17),vendorNamew(VENDORNAME28)`
 
 
    {
  "fields": "number, type, poNumber, vendorName, vendorCode, gacDate, ogacDate, poCreationDate, shipTo, materialID, season, purchaseOrg, itemNo, qtyPerLineItem, noncitric, netUnitCurrency",
  " filter": "vendorName(VENDORNAME1, VENDORNAME2), typeCode(TC1,TC2), type(Type1,TYpe2)",
  " offset": "20",
  " count": "10"
}
 
    */

// console.log(
//   filterParse("vendorName(VENDORNAME1), typeCode(TC1,TC2), type(Type1,TYpe2)")
// );

const parser: filterParser = new filterParser();
console.log(
  parser.parse(
    `vendorName(10)
    `
  )
);
