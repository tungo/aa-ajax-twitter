const APIUtil = require('./api_util.js');

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;

    $('.fetch-more').on('click', this.fetchTweets.bind(this));
  }

  fetchTweets(e) {
    e.preventDefault();

    let data;

    if (this.maxCreatedAt !== null) {
      data = {max_created_at: this.maxCreatedAt};
    }

    APIUtil.getTweets(data).then(this.insertTweets.bind(this));
  }

  insertTweets(tweets) {
    console.log(tweets);
    tweets.forEach((tweet) => {
      $('#feed').append($(`<li>${JSON.stringify(tweet)}</li>`));
    });

    this.maxCreatedAt = tweets[tweets.length - 1].created_at;
  }
}

module.exports = InfiniteTweets;
