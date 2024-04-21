import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDropDown'
})
export class SearchDropDownPipe implements PipeTransform {
  transform(list: any[], dataSearch: string, key: string): any[] {
    if (!dataSearch) {
      return list;
    }

    const filteredList = list.filter(item => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(dataSearch.toLowerCase());
      } else if (typeof item === 'string') {
        return item.toLowerCase().includes(dataSearch.toLowerCase());
      }
      return false;
    });

    if (filteredList.length === 0) {
      return ['isEmptySearch'];
    }

    return filteredList;
  }
}
