const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweets = require('./infinite_tweets.js');

$(() => {

  $(".follow-toggle").each((_, el) => {
    new FollowToggle(el);
  });

  $("nav.users-search").each((_, el) => {
    new UsersSearch(el);
  });

  $(".tweet-compose").each((_, el) => {
    new TweetCompose(el);
  });

  $('.infinite-tweets') .each((_, el) => {
    new InfiniteTweets(el);
  });
});
