"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = __importStar(require("request"));
var User_1 = require("./User");
var Repo_1 = require("./Repo");
var options = {
    headers: {
        'User-Agent': 'request'
    },
    json: true
};
var GithubApiService = /** @class */ (function () {
    function GithubApiService() {
    }
    GithubApiService.prototype.getUserInfo = function (userName, callBack) {
        request.get("http://api.github.com/users/" + userName, options, function (error, response, body) {
            // 写法一
            // let user = new User(JSON.parse(body)); // typeof body == object
            // 写法二 
            var user = new User_1.User(body); // typeof body == string
            callBack(user);
        });
    };
    GithubApiService.prototype.getRepos = function (userName, callBack) {
        request.get("http://api.github.com/users/" + userName + "/repos", options, function (error, response, body) {
            var repos = body.map(function (repo) { return new Repo_1.Repo(repo); });
            callBack(repos);
        });
    };
    return GithubApiService;
}());
exports.GithubApiService = GithubApiService;
