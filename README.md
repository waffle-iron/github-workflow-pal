# GitHub Workflow Pal
A friendly chrome extension that helps you following the buildo's GitHub workflow



### Install
- Download [here](https://github.com/buildo/github-workflow-pal/releases/download/v0.3.1/github-workflow-pal.crx)
- Navigate to `chrome://extensions`
- Drag & Drop the extension on the extension list

### Features

- **Merge button safe-guards**

  ![](https://cloud.githubusercontent.com/assets/691940/10787819/b2738a22-7d73-11e5-9824-cf0777be7b1d.png)

    The merge button is enabled on PRs only after you explicitly declare to have checked a few conditions, namely:
    - **requirements** to be in sync with the specs (if applicable)
    - **specs** to be in sync with the implementation (if applicable)
    - **test plan** to be present and checked

    This purely serves as a reminder, and doesn't perform any further checks.

- **'New buildo issue' button**

  ![](https://cloud.githubusercontent.com/assets/691940/12094956/ff4cc034-b30b-11e5-940c-56cc3ea7e27c.png)

  Add a 'New buildo issue' button for quick creation of issues specific to buildo's workflow.
