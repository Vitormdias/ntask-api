module.exports = app => {
    const Users = app.db.models.Users;

    function errorHandling(error) {
        return {
            msg: error.message
        }
    }

    app.get("/users/:id", (req, res) => {
        Users.findById(req.params.id, {
            attributes: ["id", "name", "email"]
        })
        .then(result => res.json(result))
        .catch(error => res.status(412).json(errorHandling(error)));
    });
    app.delete("/users/:id", (req, res) => {
        Users.destroy({
            where: {
                id: req.user.id
            }
        })
        .then(result => res.sendStatus(204))
        .catch(error => res.status(412).json(errorHandling(error)));
    });
    app.post("/users", (req, res) => {
        Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(412).json(errorHandling(error)));
    });
};
