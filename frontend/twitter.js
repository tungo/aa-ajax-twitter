const FollowToggle = require('./follow_toggle.js');

$(() => {
  $(".follow-toggle").each((_, el) => {
    el = new FollowToggle(el);
  });
});
