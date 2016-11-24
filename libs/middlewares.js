import bodyParser from "body-parser";
import helmet from "helmet";

module.exports = app => {
  app.set("port", process.env.PORT ||3000);
  app.set("json spaces", 4);

  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use(helmet());

  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};
