import { GithubApiService } from './GithubApiService'
import { User } from './User'
import { Repo } from './Repo';
import * as ld from 'lodash';

// node.js内置功能，用于获取第三个参数内容
console.log(process.argv[2])

let svc: GithubApiService = new GithubApiService();

if (process.argv.length < 3) {
    console.log("请输入用户名");
} else {
    svc.getUserInfo("bbcfive", (user: User) => {
        svc.getRepos(user.login, (repos: Repo[]) => {
            // 按照fork的数量由小到大排列 ps：返回值 * -1 代表由大到小排列
            let sortedRepos = ld.sortBy(repos, [(repo: Repo) => repo.forks_count]);
            user.repos = sortedRepos;
            console.log(user);
        })    
    }); 
}


