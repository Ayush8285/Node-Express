const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 3000;


//for random data generation use this link
//  https://mockaroo.com/


//Middleware - plugins that add functionality to express
// app.use(express.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request body


//Routes

//json fromat output
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//html rendering
app.get("/users", (req, res) => {
  const html =
    `
    <html>
    <head>
        <title>Users</title>
    </head>
    <body>
        <h1>Users</h1>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Email</th>
            </tr> ` +
    users
      .map(
        (user) => `
            <tr>
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.email}</td>
            </tr>`
      )
      .join("") +
    `
        
    </body>
    </html>`;
  res.send(html);
});

//use Postman to test this route
//json format input
app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({id: users.length + 1, ...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File updated successfully");
    });
    return res.json({ status: "success", id: users.length });
});

app
  .route("/api/users/:id")
  .get( (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    
    return res.json({ message: "User updated successfully" });
  })
  .delete( (req, res) => {
    
    return res.json({ message: "User deleted successfully" });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
