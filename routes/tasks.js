module.exports = app => {
    const Tasks = app.db.models.Tasks;

    function errorHandling(error) {
        return {
            msg: error.message
        }
    }

    function userTasksParams(req) {
        return {
            id: req.params.id,
            user_id: req.user.id
        }
    }

    function tasksParams(req) {
        return {
            user_id: req.user.id
        }
    }

    app.route("/tasks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Tasks.findAll({
        where: tasksParams(req)
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json(errorHandling(error));
      });
    })
    .post((req, res) => {
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(412).json(errorHandling(error)));
    });

    app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
        Tasks.findOne({
          where: userTasksParams(req)
        })
        .then(result => {
            if (result) {
                return res.json(result);
            }
            return res.sendStatus(404);
        })
        .catch(error => {
            res.status(412).json(errorHandling(error));
        });
    })
    .put((req, res) => {
        Tasks.update(req.body, {
          where: userTasksParams(req)
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json(errorHandling(error)));
    })
    .delete((req, res) => {
        Tasks.destroy({
          where: userTasksParams(req)
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json(errorHandling(error)));
    });
}
