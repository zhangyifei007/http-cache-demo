const http = require("http");
const crypto = require("crypto");

http
  .createServer((req, res) => {
    const { url } = req;
    function updateTime() {
      setInterval(() => (global.time = new Date().toUTCString()), 1000);
      return global.time;
    }
    // res.setHeader("Expires", new Date(Date.now() + 30 * 1000).toUTCString());
    // res.setHeader("Cache-Control", "max-age=20");

    // 测试lastmodify,etg
    res.setHeader("Cache-Control", "no-cache");

    if ("/" === url) {
      res.end(`
        <html>
        <!-- <meta  /> -->
        Html Update Time: ${updateTime()}
        <script src='main.js'></script>
        </html>
        `);
    } else if (url === "/main.js") {
      //   if (
      //     new Date(req.headers["if-modified-since"]).getTime() + 3 * 1000 >
      //     Date.now()
      //   ) {
      //     console.log("协商缓存命中....");
      //     res.statusCode = 304;
      //     res.end();
      //     return;
      //   }

      const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`;
      const hash = crypto.createHash("sha1").update(content).digest("hex");
      if (req.headers["if-none-match"] === hash) {
        console.log("Etag协商缓存命中.....");
        res.statusCode = 304;
        res.setHeader("Etag", hash);
        res.end();
        return;
      }

      //   res.setHeader("last-modified", new Date().toUTCString());
      res.setHeader("Etag", hash);
      res.statusCode = 200;
      res.end(content);
    }
  })
  .listen(10086, () => {
    console.log("Http Cache Test at:" + 10086);
  });
