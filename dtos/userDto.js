/** @format */

class UserDto {
  email;
  id;
  fullName;
  avatarUrl;
  activationLink;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.fullName = model.fullName;
    this.avatarUrl = model.avatarUrl;
    this.activationLink = model.activationLink;
  }
}

export { UserDto };
