async function getGitHubRepositories() {
    const username = 'vieira-a'
    const url = `https://api.github.com/users/${username}`;
    const user = await fetch(url).then(res => res.json());
    const userRep = await fetch(user.repos_url).then( res => res.json());
    
    userRep.map((repos) => {
        //myRepos.push(`name: ${repos.name}, url: ${repos.url}`)
        let myRepos = {
            'reponame': repos.name,
            'repodescription': repos.description,
            'repourl': repos.html_url,
            'repopage': repos.homepage
        }
        console.log(myRepos)
    })
}

getGitHubRepositories().catch(err => console.log(err))