const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./protos/user.proto";
const UserService = require("./services/userService");

const loaderOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

// initializing the package definition
var packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions);
const grpcObj = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();



server.addService(grpcObj.UserService.service, {
        /*our protobuf message(passwordMessage) for the RetrievePasswords was Empty. */
        retrieveUsers: (userMessage, callback) => {
            const userList = UserService.retrieveUsers();
            callback(null, userList);
        },
        addUser: (userMessage, callback) => {
            const userDetails = { ...userMessage.request };
            const updatedUserDetails =  UserService.addUser(userDetails);
            callback(null, updatedUserDetails);
        },
        updateUser: (userMessage, callback) => {
            const detailsId = userMessage.request.id;
            const userDetails = { ...userMessage.request };
            const updatedUserDetails = UserService.updateUser(detailsId, userDetails);
            callback(null, updatedUserDetails);
        },
        removeUser: (userMessage, callback) => {
            const detailsId = userMessage.request.id;
            UserService.removeUser(detailsId);
            callback(null, {})
        },
        searchUser: (userQuery, callback) => {
            const query = userQuery.request;
            const searchResult = UserService.searchUser(query.username);
            callback(null, searchResult);
        }
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);