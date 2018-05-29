export interface ProfileName {
  first: string;
  middle: string;
  last: string;
}

export interface ProfileEmail {
  email: string;
  priority: boolean;
  verified: boolean;
  published: boolean;
}

export interface ProfilePhone {
  phoneNumber: string;
  priority: boolean;
  verified: boolean;
  published: boolean;
}

export interface ProfileLocation {
  address: string;
  zipCode: any;
  country: string;
}

export interface Profile {
  id: string;
  fullname: string;
  name: ProfileName;
  emails: ProfileEmail[];
  phones: ProfilePhone[];
  location: ProfileLocation[];
  hasSupper: boolean;
}
