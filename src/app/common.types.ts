export class UserProfile {
  email: string;
  fullname: string;
  static fromJson(obj): UserProfile {
    const rv: UserProfile = new UserProfile();
    rv.email = obj.email;
    rv.fullname = obj.fullname;
    return rv;
  }
}
