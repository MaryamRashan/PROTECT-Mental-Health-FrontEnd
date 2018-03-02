import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NamefilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'namefilter',
})
export class NamefilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], searchName: string): any[] {
    console.log('typed name is ',searchName )
    if (!items) return [];
    if (!searchName) return items;
    searchName = searchName.toLowerCase();
    return items.filter(it => {
      console.log('array name is ',it )
      return it.admission.patientName.toLowerCase().includes(searchName);
    });
  }
}
