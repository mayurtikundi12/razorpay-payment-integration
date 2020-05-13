
export class CommonURL {

  static LOCAL_STORAGE_USER_KEY: string = 'tagcx_user';
  static LOCAL_STORAGE_USER_LIST: string = 'tagcx_user_list';
  static LOCAL_STORAGE_SESSION_TIMESTAMP: string = 'tagcx_session_timestamp';
  static SLOT_NUMBER: string = 'slotnumber';

  // static BASE_URL: string = 'https://preprod.tagloy.com/v2/';
  // static BASE_URL: string = 'https://cx.tagloy.com/v2/';
  // static BASE_URL: string = 'https://telecx.tagcx.com/v2/';
  static BASE_URL: string = 'http://localhost:3000/v1/';


  static FILE_TYPES = [
    {
      id : 1,
      type : 'video/mp4'
    },
    {
      id : 2,
      type : 'video/webm'
    },
    {
      id : 3,
      type : 'video/avi'
    },
    {
      id : 4,
      type : 'image/jpg'
    },
    {
      id : 5,
      type : 'image/jpeg'
    },
    {
      id : 6,
      type : 'image/png'
    },
  ]

// BOTTOM DATA UNWANTED

  static VERSION:number = 0.1;

  static URL_LOGIN: string = 'login';
  static URL_USER_LOGIN: string = 'user/login';


  static URL_VERIFY_EMAIL: string = 'verifyemail';
  static URL_FORGOT_PASSWORD: string = 'forgotpassword';
  static URL_UPDATE_PASSWORD: string = 'updatepassword';
  static URL_GET_COMPANYDETAILS = 'company/get';
  static URL_GET_COMPANYBRANCHDETAILS = 'Branch/get';
  static URL_GET_GROUP = 'Groups/get';
  static URL_GET_GROUP_FOR_SA = 'Groups/get/all';
  static URL_PURCHASE_GIFT_CARD = 'user-purchase/purchase';
  static URL_PURCHASE_GIFT_CARD_SUCCESS = 'user-purchase/purchase_complete_success';
  static URL_PURCHASE_GIFT_CARD_ERROR= 'user-purchase/delete';
  
  

  static ADD_VENUE_NOTE_USER = 'venue/note/user';

  static GET_GROUP_COMPANY = 'venue/group/list';
  static GET_VENUE_PERK_REPORT = 'perk/report';
  static GET_VENUE_PERK_REPORT_EXCEL = 'perk/report/excel';




  static CARD_OBJECT_USER: Object = {
    isUser: false,
    isUserProfilePicture: true,
    isUserName: true,
    isUserFeeds: true,
    isUserIcons: true,
    userIcons: {
      isWallOfFame: false,
      isFavorite: false,
      isBookmarked: false
    },
    isUserSocialStatus: true,
    socialStatus: {
      instagram: {
        isPresent: true,
        isSource: false
      },
      twitter: {
        isPresent: true,
        isSource: true
      },
      facebook: {
        isPresent: true,
        isSource: false
      }
    }
  };



  static LIMIT_USER_SELECTION_COUNT = 30;

  static PERK_OFFER_TYPES = [
    { value: 1, viewValue: 'Amount' },
    { value: 2, viewValue: 'Percent' },
    { value: 3, viewValue: 'Complimentary' }
  ];

  static SESSION_TIMEOUT:number = 24 * 60 * 60 * 1000;
  //static SESSION_TIMEOUT:number = 30 * 1000;

  static MONTH_ARRAY:any = [
    {
      value: 0,
      displayValue: 'NONE'
    },
    {
      value: 1,
      displayValue: 'JAN'
    },
    {
      value: 2,
      displayValue: 'FEB'
    },
    {
      value: 3,
      displayValue: 'MAR'
    },
    {
      value: 4,
      displayValue: 'APR'
    },
    {
      value: 5,
      displayValue: 'MAY'
    },
    {
      value: 6,
      displayValue: 'JUN'
    },
    {
      value: 7,
      displayValue: 'JUL'
    },
    {
      value: 8,
      displayValue: 'AUG'
    },
    {
      value: 9,
      displayValue: 'SEP'
    },
    {
      value: 10,
      displayValue: 'OCT'
    },
    {
      value: 11,
      displayValue: 'NOV'
    },
    {
      value: 12,
      displayValue: 'DEC'
    }
  ];


  static YEAR_ARRAY:any = [
    {
      value: 0,
      displayValue: "NONE"
    },
    {
      value: 2015,
      displayValue: 2015
    },
    {
      value: 2016,
      displayValue: 2016
    },
    {
      value: 2017,
      displayValue: 2017
    },
    {
      value: 2018,
      displayValue: 2018
    },
    {
      value: 2019,
      displayValue: 2019
    },
    {
      value: 2020,
      displayValue: 2020
    },
    {
      value: 2021,
      displayValue: 2021
    },
    {
      value: 2022,
      displayValue: 2022
    },
    {
      value: 2023,
      displayValue: 2023
    },
    {
      value: 2024,
      displayValue: 2024
    },
    {
      value: 2025,
      displayValue: 2025
    }
  ];

  static TAG_FEED_MODERATOR_ROLE_ID = 33;


}
