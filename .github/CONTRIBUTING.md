# Contributing Guide

Contributing to  `quiz`  is fairly easy. This document shows you how to get the project, run all provided tests.

# Dependencies

To make sure that the following instructions work, please install the following dependencies on you machine:

-   Node.js (comes with a bundles npm)
-   Git

To get the source of  `quiz`, clone the git repository via:

```
$ git clone https://github.com/dovganych/Quiz.git
```

This will clone the complete source to your local machine. Navigate to the project folder and install all needed dependencies via  **npm**:

```
$ npm install
```
This commands installs everything which is required for building and testing the project.

To run `quize` on your local machine via **npm**:
```
$ npm run start
```

## Testing

Internally  `quize`  depends on  **Webpack**, however we have masked all steps behind simple tasks processed by  **npm**.

### Source linting:  `npm run precommit`

### Unit testing:  `npm run prepush`

## Pull Request

To make a PR follow the next steps:

1.  Fork the project, clone your fork, and configure the remotes:
2.  Run the unit tests. If you added new functionality, extend existing test cases or add new ones.
3.  If you cloned a while ago, get the latest changes from upstream:
	```
	git checkout master
	git pull upstream master
	```
4.  Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:
	```
	git checkout -b <topic-branch-name>
	```
5.  Commit your changes in logical chunks. If your pull request has multiple commits which revise the same lines of code, it is better to squash those commits together into one logical unit.
6.  Push your topic branch up to your fork:
	```
	git push origin <topic-branch-name>
	```
7.  Open a Pull Request with a clear title and description.
8.  Fill the [pull request's template](https://github.com/dovganych/Quiz/.github/PULL_REQUEST_TEMPLATE.md).
9.  Submit pull request.

## Issues

In case you have faced with some bugs, or see features that will improve `quiz`, then follow the next steps:

1.  Go to the  [Issues](https://github.com/dovganych/Quiz/issues).
2.  Please, persuade that this issue hasn't been created.
3.  If you haven't found similar issue, feel free to create new issue
4.  Fill a [issue template](https://github.com/dovganych/Quiz/.github/ISSUE_TEMPLATE.md).
5.  Submit issue.
