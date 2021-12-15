const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bind("localhost:9000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
           createTodo: createTodo,
           readTodos: readTodos,
});

server.start();

const todos = [];

function createTodo(call, callback) {
  const todoItem = {
    x: call.request.x,
    y: call.request.y,
    mul: call.request.x * call.request.y,
  };
  todos.push(todoItem);
  callback(null, todoItem);
}

function readTodos(call, callback) {
  callback(null, {
    items: todos,
  });
}
