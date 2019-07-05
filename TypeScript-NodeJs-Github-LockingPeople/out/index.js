"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var ld = __importStar(require("lodash"));
// node.js内置功能，用于获取第三个参数内容
console.log(process.argv[2]);
var svc = new GithubApiService_1.GithubApiService();
if (process.argv.length < 3) {
    console.log("请输入用户名");
}
else {
    svc.getUserInfo("bbcfive", function (user) {
        svc.getRepos(user.login, function (repos) {
            // 按照fork的数量由小到大排列 ps：返回值 * -1 代表由大到小排列
            var sortedRepos = ld.sortBy(repos, [function (repo) { return repo.forks_count; }]);
            user.repos = sortedRepos;
            console.log(user);
        });
    });
}
