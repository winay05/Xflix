exports.get_time_diff = function (datetime) {
  datetime = new Date(datetime).getTime();
  let now = new Date().getTime();

  let milisec_diff;
  if (datetime < now) {
    milisec_diff = now - datetime;
  } else {
    milisec_diff = datetime - now;
  }

  let years = Math.floor(milisec_diff / 1000 / 60 / (60 * 24) / 365);
  if (years > 1) {
    return years + " years ago";
  }
  if (years > 0) {
    return years + " year ago";
  }
  let months = Math.floor(milisec_diff / 1000 / 60 / (60 * 24) / 30);
  if (months > 1) {
    return months + " months ago";
  }
  if (months > 0) {
    return months + " month ago";
  }
  let days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  if (days > 1) {
    return days + " days ago";
  }
  if (days > 0) {
    return days + " day ago";
  }

  let date_diff = new Date(milisec_diff);

  let hours = date_diff.getHours();
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours > 0) {
    return hours + " hour ago";
  }

  let minutes = date_diff.getMinutes();

  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes > 0) {
    return minutes + " minute ago";
  }
  let seconds = date_diff.getSeconds();
  if (seconds > 1) {
    return seconds + " seconds ago";
  }
  return "just now";
};
