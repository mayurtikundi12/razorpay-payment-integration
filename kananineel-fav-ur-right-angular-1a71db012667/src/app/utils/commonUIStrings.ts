
import {CommonURL} from "./common";
export class CommonUIStrings {


  static ASSIGN_USER_POPUP_BG_CLASS = 'colored-celebration-header';
  static ASSIGN_USER_POPUP_ICON_CLASS = 'tag-success-popup';

  static BLOCK_POPUP_BG_CLASS = 'colored-block-header';
  static BLOCK_POPUP_ICON_CLASS = 'tag-block-popup';

  static BOOKMARK_POPUP_BG_CLASS = 'colored-bookmark-header';
  static BOOKMARK_POPUP_ICON_CLASS = 'tag-bookmark-popup';

  static CELEBRATION_POPUP_BG_CLASS = 'colored-celebration-header';
  static CELEBRATION_POPUP_ICON_CLASS = 'tag-celebration-popup';

  static CONFIRM_POPUP_BG_CLASS = 'colored-success-header';
  static CONFIRM_POPUP_ICON_CLASS = 'tag-success-popup';

  static REJECT_POPUP_BG_CLASS = 'colored-reject-header';
  static REJECT_POPUP_ICON_CLASS = 'tag-reject-popup';

  static SUCCESS_POPUP_BG_CLASS = 'colored-success-header';
  static SUCCESS_POPUP_ICON_CLASS = 'tag-success-popup';

  static UNAUTHORISED_POPUP_BG_CLASS = 'colored-unauthorised-header';
  static UNAUTHORISED_POPUP_ICON_CLASS = 'tag-unauthorised-popup';

  static SUCCESS:string = 'Success';
  static FAILURE:string = 'Failure';
  static FORBIDDEN:string = 'Forbidden!';
  static REJECTED:string = 'Rejected';
  static UNAUTHORISED:string = 'Unauthorised';
  static BLOCKED:string = 'Blocked';

  static COMPANY_ONBOARD_SUCCESS:string = 'Company was successfully added';
  static COMPANY_UPDATE_SUCCESS:string = 'Company was updated successfully';
  static COMPANY_ADD_USER_SUCCESS:string = 'User was added successfully';
  static COMPANY_UPDATE_USER_SUCCESS:string = 'User was updated successfully';

  static UPDATE_CHILD_TITLE:string = 'Do you want update on child as well?';
  static UPDATE_DATA_TITLE:string = 'Do you want update this data?';
  static DELETE_DATA_TITLE:string = 'Do you want delete this data?';
  static DELETE_USER_TITLE:string = 'Do you want delete this user?';
  static REKEY_MFA:string = 'Do you want generate a new key for this user? You will be logged out after this operation';
  static UPDATE_USER_TITLE:string = 'Do you want Update this user?';
  static UPDATE_USER_TITLE_PASSWORD:string = 'Do you want update this Tv user password ?';
  static FEED_APPROVE_DESCRIPTION:string = 'Feed will be moved to approved section.';

  static FEED_REJECT_TITLE:string = 'Do you want to reject this feed?';
  static FEED_REJECT_DESCRIPTION:string = 'Feed will be moved to rejected section.';

  static FEED_BOOKMARK_TITLE:string = 'Do you want to bookmark this feed?';
  static FEED_BOOKMARK_DESCRIPTION:string = 'Feed will be bookmarked.';

  static FEED_CELEBRATION_TITLE:string = 'Do you want to mark this feed as celebration?';
  static FEED_CELEBRATION_DESCRIPTION:string = 'Feed will be marked as celebration.';

  static USER_BLOCK_TITLE:string = 'Do you want to block this user?';
  static USER_BLOCK_DESCRIPTION:string = 'User will be marked as blocked.';

  static REVOKE_ACCESS_TITLE:string = 'Revoke Access';
  static REVOKE_ACCESS_DESCRIPTION:string = 'Do you want revoke access of this user?';

  static DATA_ADDED_SUCCESS:string = 'Data was added successfully';
  static DATA_UPDATED_SUCCESS:string = 'Data was updated successfully';
  static MEDIA_UPDATED_SUCCESS:string = 'Media Updated Successfully!';
  static MEDIA_DELETE_SUCCESS:string = 'Media Deleted Successfully!';
  static FEED_REJECTED_SUCCESS:string = 'Feed was rejected successfully';
  static FEED_CELEBRATION_SUCCESS:string = 'Feed was marked as celebration successfully';
  static FEED_BOOKMARKED_SUCCESS:string = 'Feed was bookmarked successfully';
  static USER_DELETED_SUCCESS:string = 'User was deleted successfully';
  static PERK_UPDATED_SUCCESS:string = 'Perk was updated successfully';
  static COMPANY_ADD_SUCCESS:string = 'Company was added successfully';
  static COMPANY_BRANCH_ADD_SUCCESS:string = 'Branch was added successfully';
  static COMPANY_BRANCH_UPDATE_SUCCESS:string = 'Branch was updated successfully';
  static COMPANY_GROUP_ADD_SUCCESS:string = 'Group was added successfully';
  static COMPANY_GROUP_UPDATE_SUCCESS:string = 'Group was updated successfully';
  static COMPANY_GROUP_DELETED_SUCCESS:string = 'Group was deleted successfully';
  static MEDIA_ADD_SUCCESS:string = 'Media was added successfully';
  static MEDIA_UPDATE_SUCCESS:string = 'Media was updated successfully';
  static MEDIA_APPROVED_SUCCESS:string = 'Media was approved successfully';
  static MEDIA_REJECTED_SUCCESS:string = 'Media was rejected successfully';

  static PERK_UPDATED_ERROR:string = 'Perk was not updated successfully';
  static PERK_DESC_MESSAGE_ERROR:string = 'Please add Description,Message and terms';
  static PERK_TIME_ERROR:string = 'Please enter valid Time. End time must be greater than start time.';
  static ENTER_AT_LEAST_ONE_SESSION:string = 'Please enter at least one session.';
  static TIME_MISSING:string = 'One of the session is missing start time or end time.';
  static PERK_INVALID_ERROR:string = 'Please enter valid details';
  static COMPANY_UPDATE_ERROR:string = 'Company was not updated';
  static COMPANY_ADD_ERROR:string = 'Company was not added';

  static COMPANY_NOTE_SUCCESS:string = "Company note was added successfully";
  static POST_COMMENT_SUCCESS:string = "Successfully replied to comment.";


  static SEND_PERK_SUCCESS:string = 'Perk Sent Successfully!';
  static SEND_PERK_DESCRIPTION:string = 'Perk was sent successfully.';

  static PERK_NOT_SELECTED_MESSAGE:string = "Please select the perk to send";
  static INSTAGRAM_COMMENT_NOT_SENT:string = "Please check the message or please contact admin for this issue.";

  static USER_ALREADY_PRESENT:string = "This user cannot be added as it is already assigned to organization.";

  static LIMIT_USER_SELECT_DIALOG_TEXT:string = 'You can select only ' + CommonURL.LIMIT_USER_SELECTION_COUNT + ' users at a time.';

  static SESSION_EXPIRED:string = "Your Session has expired. Please login again to continue.";

  static USER_BLOCKED:string = "You cannot send perk to this user. This user is blocked.";

  static CONFIRM_REMOVE_MESSAGE:string = 'Do you want revoke access of this account?';
}
