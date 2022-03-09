
/******************************************************FILTER QUERY PARSER******************************************************** */
/**
 *
 * @interface parsedFilterDataType
 * @description parsed Filter object which contain field , predicate and value
 *
 */
export interface parsedFilterDataType {
    label: string;
    predicate: string;
    value: Array<string> | string;
  }
  
  /**
   *
   * @param filter @typeParam string Eg. `FieldName(Values)&typeCode(TC1,TC2)&type(TYpe2)`.
   * @returns Array<parsedFilterDataType>
   * @description V2 parse Filter to field value and predicate
   *
   *    prev version v1   : has issue with back tracking
   *    FilterParseRegex  : RegExp = /(\w+)(\(((\w+?,?)+)?\))/g,
   *    better version v2 : avoid issue upto some extend
   *    FilterParseRegex  : RegExp = /(\w+)(\((([^)]+?,?)+)?\))/g,
   *    better version v3 : http://redos-checker.surge.sh/ vuln checked
   *    FilterParseRegex: RegExp = /([^,]+)(\([^)]+?\))|[^,]+/g,
   *
   *    update to exempt . in the code :
   *    /([\w\.]+)(\((([^)]+?,?)+)?\))/g : Eg. po.xy(v1,v2)
   *
   */
  export function filterParse(filter: string): Array<parsedFilterDataType> {
    try {
      const filterstring: string = filter ? filter?.replace(/\s/g, "") : "",
        filterParseRegex = /([\w\.]+)(\((([^)]+?,?)+)?\))/g,
        filterParsedstring: Array<Array<string>> = [
          ...filterstring.matchAll(filterParseRegex),
        ];
  
      const parsedFilterObject: Array<parsedFilterDataType> = new Array<
        parsedFilterDataType
      >();
  
      let unParsedMatchs: Array<string>,
        valueMatchs: Array<string> | string,
        fieldMatch: string;
      for (
        let filterParsedstringCounter = 0;
        filterParsedstringCounter < filterParsedstring.length;
        filterParsedstringCounter++
      ) {
        unParsedMatchs = filterParsedstring[filterParsedstringCounter];
        fieldMatch = unParsedMatchs[1];
        valueMatchs = unParsedMatchs[2]?.substring(
          1,
          unParsedMatchs[2].length - 1
        );
  
        //Illegal character validation in values
        const specialCharValidationRegex = /[!@#$%\^&\*\(\)=+\[\]\{\}\|\\\<\>\/:;"'`~]/g;
        if (
          specialCharValidationRegex.test(valueMatchs) ||
          specialCharValidationRegex.test(fieldMatch)
        )
          throw new Error(`IMPROPER QUERY STRING OR ILLEGAL CHARARACTER FOUND `);
  
        valueMatchs = valueMatchs?.split(",");
        parsedFilterObject.push(filterObjectBuilder(fieldMatch, valueMatchs));
      }
  
      return parsedFilterObject;
    } catch (err) {
      console.error(err.message || "FILTER PARSING ERROR");
      throw err;
    }
  }
  
  /**
   *
   * @param fieldMatch  @typeParam string
   * @param valueMatchs @typeParam  Array<string> | string
   * @returns parsedFilterDataType
   * @description Build the Filter object
   */
  function filterObjectBuilder(
    fieldMatch: string,
    valueMatchs: Array<string> | string
  ): parsedFilterDataType {
    let predicate: string;
  
    const AllCriteria = /(AfterEq|GreaterEq|BeforeEq|LesserEq|After|Greater|Before|Lesser)/g.test(
      fieldMatch
    );
  
    if (
      !valueMatchs ||
      !fieldMatch ||
      valueMatchs?.includes(undefined) ||
      valueMatchs?.includes("")
    )
      throw new Error(
        `IMPROPER QUERY STRING OR FILTER FIELD OR FILTER FIELD VALUE IS EMPTY.`
      );
  
    if (valueMatchs.length !== 1 && AllCriteria)
      throw new Error(
        ` AFTEREQ|GREATEREQ|BEFOREEQ|LESSEREQ|AFTER|GREATER|BEFORE|LESSER - OPERATION MUST HAVE ONLY ONE PARAMETER.`
      );
    else if (valueMatchs.length === 1 && AllCriteria)
      valueMatchs = valueMatchs[0];
    else if (valueMatchs.length === 1 && !AllCriteria)
      valueMatchs = valueMatchs[0];
  
    if (/(AfterEq|GreaterEq)/g.test(fieldMatch)) predicate = ">=";
    else if (/(BeforeEq|LesserEq)/g.test(fieldMatch)) predicate = "<=";
    else if (/(After|Greater)/g.test(fieldMatch)) predicate = ">";
    else if (/(Before|Lesser)/g.test(fieldMatch)) predicate = "<";
    else {
      predicate = Array.isArray(valueMatchs) ? "IN" : "=";
    }
  
    fieldMatch = fieldMatch.replace(
      /(AfterEq|GreaterEq|BeforeEq|LesserEq|After|Greater|Before|Lesser)/g,
      ""
    );
  
    const parsedFilterObject: parsedFilterDataType = {
      label: fieldMatch,
      predicate: predicate,
      value: valueMatchs,
    };
  
    return parsedFilterObject;
  }
  /******************************************************FILTER QUERY PARSER ENDS******************************************************** */
  