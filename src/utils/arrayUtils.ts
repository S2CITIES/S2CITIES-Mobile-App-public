/**
 * Group array elements by a criteria: split the array in slices,
 * one slice for each different value of the key extractor
 * @param array the array to split
 * @param keyExtractor function to extract the key string upon which grouping the elements
 * @returns an array of slices, each one with a 'key' field (containing a unique value)
 * and a 'data' field (containing the grouped elements referring to that value)
 */
export var groupBy = <T>(
   array: T[],
   keyExtractor: (x: T) => string | undefined
) => {
   let groupsObj: { [id: string]: T[] } = array.reduce(function (
      groupsObj: { [value: string]: T[] },
      x: T
   ) {
      const key = keyExtractor(x);

      // skip objects not having that key
      if (key === undefined) {
         return groupsObj;
      }

      (groupsObj[key] = groupsObj[key] || []).push(x);

      return groupsObj;
   },
   {});

   let groupsArray: {
      key: string;
      data: T[];
   }[] = [];

   for (let key in groupsObj) {
      groupsArray.push({
         key,
         data: groupsObj[key],
      });
   }

   return groupsArray;
};
