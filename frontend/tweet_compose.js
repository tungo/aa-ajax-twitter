const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);

    this.$el.on("submit", this.submit.bind(this));
    this.$el.on("input", this.handleInput.bind(this));
    $('a.add-mentioned-user').on('click', this.addMentionedUser.bind(this));
    this.$el.on('click', 'a.remove-mentioned-user', this.removeMentionedUser.bind(this));
  }

  submit(e) {
    e.preventDefault();

    const data = this.$el.serializeJSON();
    this.$el.find(":input").prop("disabled", true);
    APIUtil.createTweet(data).then(this.handleSuccess.bind(this));
  }

  clearInput() {
    this.$el.find("textarea").val('');
    this.$el.find(".mentioned-users").empty();
  }

  handleSuccess(tweet) {
    this.clearInput();
    this.$el.find(":input").prop("disabled", false);

    const $ul = $(this.$el.data('tweets-ul'));

    const $li = $(`<li>${tweet.content} -- </li>`);
    const $a = $(`<a href="/users/${tweet.user_id}">${tweet.user.username}</a>`);
    $li.append($a);
    $li.append(`-- ${tweet.created_at}`);

    $ul.append($li);
  }

  handleInput(event) {
    const maxChars = 140;
    const currentChars = this.$el.find("textarea").val().length;
    const remainder = maxChars - currentChars;

    if (remainder <= 0) {
      const maxInput = this.$el.find("textarea").val().slice(0,140);
      this.$el.find("textarea").val(`${maxInput}`);
    }

    this.$el.find(".chars-left").empty();
    this.$el.find(".chars-left").append(`${remainder + 1} characters left.`);
  }

  addMentionedUser(e) {
    e.preventDefault();

    const scriptTag = this.$el.find('script');
    this.$el.find('.mentioned-users').append(scriptTag.html());

    return false;
  }

  removeMentionedUser(e) {
    e.preventDefault();

    $(e.currentTarget).parent().remove();

    return false;
  }
}


module.exports = TweetCompose;
