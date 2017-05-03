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
      let $li = $(`<li><a href="/users/${user.id}">${user.username}</a></li>`);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
