export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  displayPicture: string;
  metadataJson: string;
  stripeCustomerToken: string;
  accessToken: string;
  expDate: string;
}
