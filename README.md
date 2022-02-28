# View Counter Badge 

<img src = "https://view-counter.aveek.workers.dev" alt="View counter badge">

Count how many visitors any page gets. A simple solution to add a view counter badge to your readme files or web page.

## Usage

The view counter badge is meant to be deployed individually for each profile/user. Click the button and then follow the steps below to deploy your own view counter in no time!

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/aveek-saha/view-counter-badge)

#### Set your app name

In `wrangler.toml` and change the `name` property - this will be the subdomain that your app is published on.

Your Cloudflare workers domain will be of the format `{your-worker-domain}.workers.dev`. When you publish an app on a Worker,
it will be published on a subdomain corresponding to your app name - `{worker-name}.{your-worker-domain}.workers.dev` by default.

#### Create a KV

Create a new namespace for your KV, it's important that you name it `ViewCounter`. Then edit your `wrangler.toml` and change the `kv_namespaces` property with the id. It should look something like this.

```toml
kv_namespaces = [
  {binding = "ViewCounter", id = "{your-kv-id}"}
]
```

#### Get your Account ID and create a new API Token

To get your account ID:

-   Go to https://dash.cloudflare.com > Workers
-   Copy your account ID

To create a new API Token:

-   Go to https://dash.cloudflare.com/profile/api-tokens > Create Token
-   Give your token a name (i.e. Github Actions)
-   Choose start with template
-   Select the "Edit Cloudflare Workers" template
-   Account Resources > Include > {your account}
-   Zone Resources > Include > All zones from account > {your account}

Once done, navigate to your GitHub repository > Settings > Secrets and add the following secrets:

```
- Name: CF_API_TOKEN
- Value: your-api-token

- Name: CF_ACCOUNT_ID
- Value: your-account-id
```

Now if you push a new commit into `master` and you'll find your view counter deployed at `{worker-name}.{your-worker-domain}.workers.dev`

## Add counter to README

```html
<img
    src="https://<Your-cloudflare-deployment>.workers.dev"
    alt="View counter badge"
/>
```

OR

```markdown
![View counter badge](https://<Your-cloudflare-deployment>.workers.dev)
```

## Customization

You can pass arguments to customize your view counter. The badge is created using `badgen` so all the options supported by `badgen` except for icon and iconWidth can be used.


|  Parameter   | Default |         Allowed values          |      Example       |
| :----------: | :-----: | :-----------------------------: | :----------------: |
|   `label`    |  Views  |           Any string            |  `label=Visitors`  |
| `labelColor` |   555   | RGB values or valid color names | `labelColor=black` |
|   `color`    |  blue   | RGB values or valid color names |   `color=green`    |
|   `style`    |  flat   |       `flat` or `classic`       |  `style=classic`   |
|   `scale`    |    1    |           Any integer           |     `scale=2`      |

Valid color names are:
```
blue, cyan, green, yellow, orange, red, pink, purple, grey, black
```

Example of a counter with parameters:

```
https://<Your cloudflare deployment>.workers.dev?style=classic&labelColor=black&color=green
```