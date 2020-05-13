export class Addvenue {

  formData:any;

  static create(venue_details)
  {
    return new Addvenue(venue_details);
  }

  constructor(venue_details)
  {
    this.formData = new FormData();
    this.formData.append('venue_details', venue_details);
    console.log(venue_details,"add obj media");
  }
}
