const buildFilter = (filters: Array<string>, collection): unknown => {
    const filtersResponse = [];
    filters.forEach((filter) => {
        //data[filter] = [...new Set(searchResult.map((item) => item[filter]))];
        const data = collection.reduce(
            (results, po) => ((results[po[filter]] = (results[po[filter]] || 0) + 1), results),
            {},
        );
        const filterData = {
            filterName: filter,
            filterValues: [],
            totalFilterCount: collection.length,
        };

        for (const key of Object.keys(data)) {
            filterData.filterValues.push({
                filterValue: key,
                filterCount: data[key],
            });
        }
        filtersResponse.push(filterData);
    });

    return filtersResponse;
};
export default buildFilter;
