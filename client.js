const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:9000", grpc.credentials.createInsecure());

client.createTodo(
  {
    x: Math.floor(Math.random() * 10 + 1),
    y: Math.floor(Math.random() * 10 + 1),
  },
  (err, response) => {console.log("Received from Server " + JSON.stringify(response));});

client.readTodos({}, (err, response) => {
  console.log("todos", JSON.stringify(response));
});
