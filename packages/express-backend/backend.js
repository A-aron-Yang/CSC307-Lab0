// backend.js
import express from 'express';
import cors from 'cors';
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/*const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        },
        {
            "id": "qwe123",
            "job": "Zookeeper",
            "name": "Cindy"
        }
    ]
};*/
//Step 4
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};
//step 7
const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
//DELETE
const deleteUserById = (id) => {
    users["users_list"] = users["users_list"].filter(
        (user) => user["id"] !== id
    );
};
//POST
app.post("/users", (req, res) => {
    const user = req.body;
    userServices.addUser(req.body)
        .then((newUser) => res.status(201).send(newUser)
        .catch((error) => res.status(500).send(error)))
});

//step 7 GET name/job
app.get("/users", (req, res) => {
    const { name, job } = req.query;
    userServices.getUsers(name, job)
        .then((users) => res.send(users))
        .catch((error) => res.status(500).send(error));
});
//GET users id
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.findUserById(id)
        .then((user) => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((error) => res.status(500).send(error));
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
//DELETE function
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.deleteUserById(id)
        .then((deleteUser) => {
            if(!deleteUser){
                res.status(404).send("User not found.");
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => res.status(500).send(error))
})

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});