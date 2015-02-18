'use strict';

export default {
  /**
   * @param {Date} time
   * @returns {String}
   */
  relativeTime: function(time) {
    var date     = new Date(time),
        diff     = (Date.now() - date.getTime()) / 1000,
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
      return date.getMonth()+1 + '月 ' + date.getDate() + '日';
    }

    return day_diff === 0 && (
      diff < 60      && Math.floor(diff) + '秒前' ||
      diff < 120   && '1分前' ||
      diff < 3600  && Math.floor(diff / 60) + '分前' ||
      diff < 7200  && '1時間前' ||
      diff < 86400 && Math.floor(diff / 3600) + '時間前'
      ) ||
      day_diff === 1 && '昨日' ||
      day_diff < 7   && day_diff + '日前' ||
      day_diff < 31  && Math.floor(day_diff / 7) + '週間前';
  }
};
