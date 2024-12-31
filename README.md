# ReviewBlade

## Features

This is a tool to help deal with GitHub requests:

- View requests that you have authored
- View requests that need your review
- View the title, description, diff, and review status of each PR

## Roadmap

In the future, I'd like to be able to do all of the basic functionality of working with GitHub pull requests:

- Allow users to onboard to the app without editing code
- Participate in PR discussions (comments on code)
- Allow you to author new PRs and edit existing PRs, modifying the title and description
- Comment on lines in a PR
- Approve/comment/request changes on a PR
- Add a lot of keyboard functionality so that this can be a true power tool

## Developing

This project uses `pnpm` and SvelteKit. To get up and running with a development server, you will first need to put a GitHub API token in the `creds.ts` file. Without that, all pages will fail to retrieve data.

```bash
pnpm install
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Inspiration

This app was inspired by Graphite, which is a beautiful tool for stacking PRs.

When stacking fans at my job switched tooling, I found that I actually really missed having an easy review tool.

I also wanted to learn Svelte, and this was my first project using it.
