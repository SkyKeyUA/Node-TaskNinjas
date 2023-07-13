/** @format */

class PostDto {
  nickname;
  realName;
  originDescription;
  superpowers;
  catchPhrase;
  imageUrl;
  user;

  constructor(model) {
    this.nickname = model.nickname;
    this.realName = model.realName;
    this.originDescription = model.originDescription;
    this.superpowers = model.superpowers;
    this.catchPhrase = model.catchPhrase;
    this.imageUrl = model.imageUrl;
    this.user = model.user;
  }
}

export { PostDto };
