/**
 *
 * @interface parsedFilter
 * @description parsed Filter object which contain field , predicate and value
 *
 */
export interface parsedFilter {
  label: string;
  predicate: string;
  value: Array<string> | string;
}

/**
 *
 * @class filter Parser
 * @description Used to Parse Filter
 */
export class filterParser {
  /**
   *
   * @param filter  @typeParam string
   * @returns Array<parsedFilter>
   * @description parse the filter query string to Array<parsedFilter>
   */
  parse(filter: string): Array<parsedFilter> {
    const filterParse: Array<parsedFilter> = new Array<parsedFilter>(),
      splitedFilter: Array<string> = filter
        ?.replace(/\s/g, "")
        ?.replace(/\),/g, ")&")
        ?.split("&");

    splitedFilter.forEach((data) => {
      const matchedData = /(?:([^,]+)(\(.+?\)$))|([^,]+)/.exec(data);
      let [_, filterName] = matchedData;
      let filterValue: string | Array<string> = matchedData[2]
        ?.substring(1, matchedData[2].length - 1)
        ?.split(",");

      filterValue = filterValue.length === 1 ? filterValue[0] : filterValue;
      this.validatefilter(filterName, filterValue);
      const predicate = this.predicateExtractor(filterName, filterValue);
      filterValue = this.dataTypeParse(filterName, filterValue);

      filterName = filterName.replace(
        /(AfterEq|GreaterEq|BeforeEq|LesserEq|After|Greater|Before|Lesser)/g,
        ""
      );
      filterParse.push({ label: filterName, value: filterValue, predicate });
    });

    return filterParse;
  }

  /**
   *
   * @param filterName  @typeParam string
   * @param filterValue @typeParam  any | Array<any>
   * @returns void
   * @description validate filter name and value, if any error throw exceptions
   */
  validatefilter(filterName: string, filterValue) {
    const specialCharValidationRegex = /[!@#$%\^&\*\(\)=+\[\]\{\}\|\\\<\>\/;"'`~]/g;
    let filterValueTest = false;

    if (Array.isArray(filterValue)) {
      for (let _ = 0; _ < filterName.length; _++)
        if (specialCharValidationRegex.test(filterValue[_])) {
          filterValueTest = true;
          break;
        }
    } else {
      filterValueTest = specialCharValidationRegex.test(filterValue);
    }

    if (specialCharValidationRegex.test(filterName) || filterValueTest)
      throw new Error(`ILLEGAL CHARARACTER OR QUERY FORM FOUND `);

    if (!filterName || !filterValue)
      throw new Error(`FILTER NAME OR FILTER FIELD VALUE IS EMPTY`);

    if (
      Array.isArray(filterValue) &&
      (filterValue?.includes(undefined) || filterValue?.includes(""))
    )
      throw new Error(`FILTER NAME OR FILTER FIELD VALUE IS EMPTY.`);

    if (
      Array.isArray(filterValue) &&
      /(AfterEq|GreaterEq|BeforeEq|LesserEq|After|Greater|Before|Lesser)/g.test(
        filterName
      )
    )
      throw new Error(`FILTER OPERATOR VALUE COUNT MISMATCH`);
  }

  /**
   *
   * @param filterName  @typeParam string
   * @param filterValue @typeParam  any | Array<any>
   * @returns predicate string
   * @description predicate extraction
   */
  predicateExtractor(filterName: string, filterValue): string {
    let predicate;
    if (/(AfterEq|GreaterEq)/g.test(filterName)) predicate = ">=";
    else if (/(BeforeEq|LesserEq)/g.test(filterName)) predicate = "<=";
    else if (/(After|Greater)/g.test(filterName)) predicate = ">";
    else if (/(Before|Lesser)/g.test(filterName)) predicate = "<";
    else {
      predicate = Array.isArray(filterValue) ? "IN" : "=";
    }

    return predicate;
  }

  /**
   *
   * @param filterName  @typeParam string
   * @param filterValue @typeParam  any | Array<any>
   * @returns datatype parsed filter value array or value
   * @description data type parsing
   */
  dataTypeParse(filterName: string, filterValue): string | Array<string> {
    const isNumeric = (candidate) => {
      if (typeof candidate === "number") return Number.isFinite(candidate);
      if (typeof candidate === "string") {
        return candidate.trim() !== "" && Number.isFinite(Number(candidate));
      }
      return false;
    };

    const isDate = (candidate) => {
      if (!isNaN(candidate.getTime())) return true;
      return false;
    };

    const isValidDate = (date) => {
      return date != "Invalid Date";
    };

    if (/(AfterEq|After|BeforeEq|Before)/g.test(filterName)) {
      filterValue = new Date(filterValue).toISOString();
      if (!isValidDate(filterValue))
        throw new Error(`ERROR WHILE PARSING DATE`);
    } else if (/(GreaterEq|LesserEq|Greater|Lesser)/g.test(filterName))
      filterValue = isNumeric(filterValue)
        ? parseFloat(filterValue)
        : filterValue;
    else {
      if (Array.isArray(filterValue)) {
        filterValue.map((data) => {
          if (isNumeric(data)) {
            return Number(data);
          } else if (isDate(new Date(data))) {
            const parsedDate = new Date(data).toISOString();
            if (!isValidDate(parsedDate))
              throw new Error(`ERROR WHILE PARSING DATE`);
            return parsedDate;
          }
        });
      } else {
        if (isNumeric(filterValue)) {
          filterValue = Number(filterValue);
        } else if (isDate(new Date(filterValue))) {
          const parsedDate: string = new Date(filterValue).toISOString();
          if (isValidDate(parsedDate))
            throw new Error(`ERROR WHILE PARSING DATE`);

          filterValue = parsedDate;
        }
      }
    }

    return filterValue;
  }
}
