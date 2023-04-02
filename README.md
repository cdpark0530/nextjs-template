# Before npm install
Make sure you're using npm v8 which this project is built upon.
If you don't have any correspoding node version like node v18 for this,
we recommend you to use `nvm` to switch to a correspoding node version.

# Project structures
## Next.js 13
### Usage of the `app` directory
This project adopts the structure of the experimental `app` directory to migrate to it smootly
when the feature will be officially released.
But it does only partially because it doesn't work with `Emotion` or `MUI` that this project will use.
@see https://github.com/vercel/next.js/issues/41994#issuecomment-1296470197

And the partial usages are:
- Where to put the components for layout of the app.
- Where to put trivial application components
