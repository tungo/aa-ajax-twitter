class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');

    this.render();
    this.$el.on('click', (e) => {
      this.handleClick(e);
    });
  }

  render() {
    if (this.followState === 'unfollowed') {
      this.$el.text('Follow!');
    } else if (this.followState === 'followed') {
      this.$el.text('Unfollow!');
    }
  }

  handleClick(e) {
    e.preventDefault();
    $.ajax({
      method: (this.followState === 'followed') ? 'DELETE' : 'POST',
      url: `/users/${this.userId}/follow`,
      dataType: 'json',
      success: (res) => {
        this.toggleFollowState();
        this.render();
      }
    });
  }

  toggleFollowState() {
    if (this.followState === 'unfollowed') {
      this.followState = 'followed';
    } else if (this.followState === 'followed') {
      this.followState = 'unfollowed';
    }
  }
}

module.exports = FollowToggle;
