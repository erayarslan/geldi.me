(function (window) {
  const hostnameTokens = location.hostname.split(".");
  const subDomain = hostnameTokens.slice(0, hostnameTokens.length - 2).join(" ");

  const get = function (url, headers, fn) {
    if (arguments.length === 2) {
      fn = headers;
      headers = {};
    }

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.timeout = 2000;
    req.onerror = fn;
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        return fn(null, req);
      }

      return null;
    };

    for (const k in headers) {
      if (headers[k]) {
        req.setRequestHeader(k, headers[k]);
      }
    }

    req.send();

    return null;
  };

  const render = function (text) {
    document.getElementById("request").innerText = subDomain;
    document.getElementById("result").innerText = text;
    document.title = text + " geldi mi?"
  };

  get('database.json', function (err, response) {
    const database = JSON.parse(response.responseText);
    if (database.hasOwnProperty(subDomain)) {
      render(database[subDomain]);
    } else {
      render("toptancıda. haftaya gelir. 404");
    }
  });
})(window);