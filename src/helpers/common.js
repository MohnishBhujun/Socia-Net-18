const moment = require('moment');
  //format the time
  module.exports = {
  formatTime(time) {
    const parsedDate = moment(time);
    const formattedDate = parsedDate.format('MMM DD, YYYY [at] hh:mma');
    console.log(formattedDate)
    return formattedDate; // Output: Apr 26, 2024 at 08:04am
    },
}