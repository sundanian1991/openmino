---
name: github
description: |
  使用 `gh` CLI 与 GitHub 交互。

  当用户需要以下内容时使用此技能：
  - 查询 PR 状态、检查 CI 运行结果
  - 创建/管理 Issue 和 Pull Request
  - 查看工作流运行日志
  - 执行高级 GitHub API 查询

  即使没有明确说"用 gh 命令"，只要涉及 GitHub 操作就应优先使用此技能而非网页浏览。
---

# GitHub Skill

Use the `gh` CLI to interact with GitHub. Always specify `--repo owner/repo` when not in a git directory, or use URLs directly.

## Pull Requests

Check CI status on a PR:

```bash
gh pr checks 55 --repo owner/repo
```

List recent workflow runs:

```bash
gh run list --repo owner/repo --limit 10
```

View a run and see which steps failed:

```bash
gh run view <run-id> --repo owner/repo
```

View logs for failed steps only:

```bash
gh run view <run-id> --repo owner/repo --log-failed
```

## API for Advanced Queries

The `gh api` command is useful for accessing data not available through other subcommands.

Get PR with specific fields:

```bash
gh api repos/owner/repo/pulls/55 --jq '.title, .state, .user.login'
```

## JSON Output

Most commands support `--json` for structured output. You can use `--jq` to filter:

```bash
gh issue list --repo owner/repo --json number,title --jq '.[] | "\(.number): \(.title)"'
```
