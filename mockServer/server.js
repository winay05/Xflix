const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
const data = require("./db.json").videos;

const ageContent = {
  "7+": ["Anyone", "7+"],
  "12+": ["Anyone", "7+", "12+"],
  "16+": ["Anyone", "7+", "12+", "16+"],
  "18+": ["Anyone", "7+", "12+", "16+", "18+"],
};

// console.log(data);
// server.use((req, res, next) => {
//   //   console.log(req, req.body);
//   next();
// });
server.use(middlewares);
server.get("/v1/videos", (req, res, next) => {
  if (req.query.sortBy) {
    // console.log(req);
    let base = req.originalUrl.split("?");
    let qs = base[1].split("&");
    // let q = ;
    qs[0] = qs[0].replace("sortBy", "_sort") +"&_order=desc";
    // qs[0] += ;
    // console.log(qs[0]);
    // console.log(base[0] + "?" + qs.join("&"));
    req.originalUrl = base[0] + "?" + qs.join("&");
    
  }
  next();
});


server.get("/v1/videos", (req, res, next) => {
  // console.log(req.query);
  let age = req.query.contentRating;

  // console.log(age);
  if (!age) {
    next();
  } else {
    if (age === "Anyone") {
      age = "18+";
    }

    let resBody = data.filter(
      (el) => ageContent[age].indexOf(el.contentRating) !== -1
    );
    if(req.query.q){
      resBody = resBody.filter(
      (el) => el.title.toLowerCase().includes(req.query.q.toLowerCase()) ||
              el.genre.toLowerCase().includes(req.query.q.toLowerCase())
    );
    }
    // console.log(resBody);
    res.status(200).json({
      data: resBody,
    });
  }
});
server.patch("/v1/videos/:videoId/votes", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "OK",
  });
});

server.post("/v1/videos", (req, res, next) => {
  if (!req.body._id) {
    req.body = { _id: `${data.length + 1}`, ...req.body };
  }
  next();
});
server.use("/v1", router);
server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server is running");
});
