import { Pipe, PipeTransform } from '@angular/core';
declare var $:any;


@Pipe({ name: 'venueListFilter' })
export class VenueListFilter implements PipeTransform {
  transform(venueList, searchString) {
    if (venueList == null) {
      return null;
    }
    if(searchString != undefined){
      searchString = searchString.toLowerCase().trim();
    }
    return venueList.filter(venue => {
      let cond1:any;
      let cond2:any;
      let cond3:any;
      let cond4:any;

      if(venue['business_name'] != undefined)
        cond1 = new RegExp(searchString).test(venue['business_name'].toLowerCase());

      if(venue['description'] != undefined)
        cond2 = new RegExp(searchString).test(venue['description'].toLowerCase());

      if(venue['business_category'] != undefined)
        cond3 = new RegExp(searchString).test(venue['business_category'].toLowerCase());

      // if(venue['display_address'] != undefined)
      //   cond4 = new RegExp(searchString).test(venue['display_address'].toLowerCase());

      return cond1 || cond2 || cond3 ;
      }
    );
  }
}
