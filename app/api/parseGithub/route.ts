import { NextResponse } from "next/server";

function extractGithubUsername(url: string): string | null {
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      const segments = parsed.pathname.split("/").filter(Boolean);
  
      return segments.length > 0 ? segments[0] : null;
    } catch {
      return null;
    }
}

async function getGithubBasic(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return null;
    return res.json();
}


async function getGithubRepoStats(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!res.ok) return null;
    const repos = await res.json();
  
    let totalStars = 0;
    const languageSet = new Set<string>();
  
    repos.forEach((repo: { stargazers_count: number; language: string | null }) => {
      totalStars += repo.stargazers_count;
      if (repo.language) languageSet.add(repo.language);
    });
  
    return {
      repoCount: repos.length,
      totalStars,
      languages: Array.from(languageSet)
    };
  }
  

async function getGithubData(username: string) {
    const basic = await getGithubBasic(username);
    const repoStats = await getGithubRepoStats(username);
  
    if (!basic || !repoStats) return null;
  
    return {
      username,
      followers: basic.followers,
      following: basic.following,
      publicRepos: basic.public_repos,
      createdAt: basic.created_at,
      ...repoStats
    };
  }

export async function POST(req: Request) {
    const { github } = await req.json();

    let githubData = null;
    
    if (github) {
        const githubUser = extractGithubUsername(github);
        githubData = githubUser ? getGithubData(githubUser) : null;
    }

    return NextResponse.json({ githubData }, { status: 200 });
}
