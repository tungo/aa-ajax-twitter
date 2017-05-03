const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(() => {

  $(".follow-toggle").each((_, el) => {
    el = new FollowToggle(el);
  });

  $("nav.users-search").each((_, el) => {
    el = new UsersSearch(el);
  });
});
