#!/usr/bin/env python
import os
import datetime
from string import Template
from github import Github

repos = [
  'textileio/docs',
  'textileio/go-threads',
  'textileio/js-threads',
  'textileio/js-foldersync',
  'textileio/js-ipfs-lite',
  'textileio/js-examples',
  'textileio/js-powergate-client',
  'textileio/js-textile',
  'textileio/grpc-ipfs-lite',
  'textileio/dart-threads-client',
  'textileio/dart-textile',
  'textileio/lotus-devnet',
  'textileio/powergate',
  'textileio/papers',
  'textileio/textile',
]

def main():
  g = Github(os.environ.get('GITHUB_TOKEN'))
  s = Template("  <a href='${href}' target='_blank' class='txtl-member'><img src='${src}'/></a>") 
  contributors = set([])

  for name in repos:
    repo = g.get_repo(name)

    # Collect all ticket creators
    dt = datetime.datetime.strptime('2019-09-01', '%Y-%m-%d')
    i = repo.get_issues(since=dt)
    for issue in i:
      if issue.user.type == 'User':
        contributors.add(issue.user)

    # Collect all code contributors
    repo = g.get_repo(name)
    c = repo.get_contributors()
    for dev in c:
      if dev.type == 'User':
        contributors.add(dev)

  # Print a copy/paste HTML block for markdown
  print("<div class='txtl-community'>")
  for dev in sorted(contributors, key=lambda x: x.login):
    print(s.substitute(href=dev.html_url, src=dev.avatar_url))
  print("</div>")

if __name__ == "__main__":
  main()