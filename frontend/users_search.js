const FollowToggle = require('./follow_toggle.js');
const APIUtil = require('./api_util.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input");
    this.$ul = this.$el.find("ul.users");

    this.$el.on("input", this.handleInput.bind(this));
  }

  handleInput(e) {
    e.preventDefault();

    APIUtil.searchUsers({query: this.$input.val()}, (res) => {
      this.renderResult(res);
    });
  }

  renderResult(res) {
    this.$ul.empty();

    res.forEach((user) => {

      let $button = $('<button></button>');
      new FollowToggle($button, {
        userId: user.id,
        followState: (user.followed) ? 'followed' : 'unfollowed'
      });

      let $li = $('<li></li>');
      $li.append($(`<a href="/users/${user.id}">${user.username}</a>`));
      $li.append($button);

      this.$ul.append($li);

    });
  }
}

module.exports = UsersSearch;
