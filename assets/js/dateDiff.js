function dateDiff(date1, date2) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    var timeDiff = d2.getTime() - d1.getTime();
    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
}