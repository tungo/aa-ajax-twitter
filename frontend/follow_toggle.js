const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = this.$el.data('initial-follow-state') || options.followState;

    this.render();
    this.$el.on('click', (e) => {
      this.handleClick(e);
    });
  }

  render() {
    if (this.followState === 'unfollowed') {
      this.$el.text('Follow!');
      this.$el.prop('disabled', false);
    } else if (this.followState === 'followed') {
      this.$el.text('Unfollow!');
      this.$el.prop('disabled', false);
    } else if (this.followState === 'following') {
      this.$el.prop('disabled', true);
    } else if (this.followState === 'unfollowing') {
      this.$el.prop('disabled', true);
    }
  }

  handleClick(e) {
    e.preventDefault();


    let promise;
    if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();
      promise = APIUtil.followUser(this.userId);
    } else if (this.followState === 'followed') {
      this.followState = 'unfollowing';
      this.render();
      promise = APIUtil.unfollowUser(this.userId);
    }

    promise.then(() => {
      this.toggleFollowState();
      this.render();
    });
  }

  toggleFollowState() {
    if (this.followState === 'unfollowed' || this.followState === 'following') {
      this.followState = 'followed';
    } else if (this.followState === 'followed' || this.followState === 'unfollowing') {
      this.followState = 'unfollowed';
    }
  }
}

module.exports = FollowToggle;
