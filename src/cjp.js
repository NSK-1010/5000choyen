function cjpgen(cjptext) {
    var request = new XMLHttpRequest();
    var cjpurl = "https://cjp.sbmr.in/api/raw/" + cjptext;
    request.open('GET', cjpurl, false);  // `false` で同期リクエストになる
    request.send(null);

    if (request.status === 200) {
        var cjpans = request.responseText;
    }
    return cjpans;
}