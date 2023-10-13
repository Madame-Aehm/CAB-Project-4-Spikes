# Project 4: Spike 8

## Deploy to Vercel

We've chosen Vercel as our preferred deployment platform as it's one of the last places online where you can deploy a backend project for free. It's up to you if you want to deploy both parts on the same platform, or you could use a different service like Netlify for your front-end. 

First step: get rid of all errors and warnings. Even something as small as an unused variable can cause a problem with your build. No red!

We'll also need to add a `vercel.json` file to the root of each project. This where we set the [configuration settings](https://vercel.com/docs/concepts/projects/project-configuration). 

To use Vercel, you'll need an account. We'll actually be deploying **two** projects - your client and your server will be deployed separately. From your overview, click **Add New...** to add a new project.

### Deploy Back-End

Add the `vercel.json`, then add, commit, and push to GitHub:

```json
{
  "builds": [{
    "src": "./index.js",
    "use": "@vercel/node"
  }],
  "routes": [{
    "src": "/[^.]+",
    "dest": "/",
    "status": 200
  }]
}
```

We'll import from a GitHub repository, so make sure your remote repo has the latest version of your project. Select your project, then under **Configure Project**, our first step will be to change the **Root Directory** to your `server`.

Underneath, there will be a dropdown for us to enter our **Environmental Variables**. Copy and paste your entire `.env` file into these inputs (you can actually paste the entire file, and Vercel will separate the keys from the values).

**Deploy**!! The build can sometimes take a few minutes. 

If everything goes according to plan, you can now visit your API endpoints and interact with them the same as if you were running it locally on localhost. 

### Deploy Front-End

Add the `vercel.json`, then add, commit, and push to GitHub:

```json
{
  "routes": [{
    "src": "/[^.]+",
    "dest": "/",
    "status": 200
  }]
}
```

Now let's look at the front-end. Go back to the main overview, and click **Add New...** again to add another project. Select your project, but this time set the **Root Directory** to your `client`.

We're going to have to add our `.env` file again, but here's where we'll need to edit variable defining the base URL of our back-end. It will no longer be `http://localhost:5000/`, but instead the root URL of your newly deployed server project! 

**Deploy**!! And hopefully, your app is now fully online! Since we have it linked to the remote GitHub repository, any changes pushed to the branch you've deployed will trigger a rebuild of the vercel deployment, and you new changes should be live within a few minutes.

## PWA configuration

Now that it's deployed, we can look at making the app installable as a **Progressive Web App (PWA)**. A PWA provides a user with an app-like experience, even though the app is really just a website running in a web browser. We do this by adding a `manifest.json` which gives the browser [instructions](https://web.dev/add-manifest/) on how the app should behave when installed on the device. 

There are still many limitations to this functionality, since browsers and operating systems are never in full agreement. Making your app installable across all browsers and devices will involve lots of options, so today I will only demonstrate how to configure a `manifest.json` that will install an app on an Android device running Chrome. This is mostly because this is my own set up and so testing is easy! Feel free to adapt the code to your own needs, and if you get it working across other operating systems and browsers, please share your process! 🙏

Since we used **Vite** to build our app, I've followed the [documentation](https://vite-pwa-org.netlify.app/) provided by Vite to make their apps installable, and they happen to have a handy package to make it simpler for us! Install with `-d`, since we want this package to run in development.

```
npm install -d vite-plugin-pwa
```

On our `vite.config.ts` (or `.js` if you haven't used Typescript), we will import `VitePWA` form this package, and call it in the `plugins` array. We'll also create a **manifest object** to pass as an argument to this function (the TS Type for this is also included in the pwa plugin package). This will include all the properties we want on our `manifest.json` that we are going to let the plugin generate for us on build. 

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest:{
    name:"Honey Badgers MERN Spikes App",
    short_name:"HB MERN",
    description:"This app was created during live demos of MERN stack technologies.",
    icons:[
    {
      src: 'assets/maskable_icon_x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/maskable_icon_x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'any maskable'
    },
    {
      src:'assets/maskable_icon_x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'apple touch icon',
    }
  ],
  theme_color:'#171717',
  background_color:'#000000',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
```

A manifest **must** include at least a `name` and `short_name`, which be the titles shown under the icon on the home screen, and in the longer title shown at the top of the app window. It will also need an icons for at least `512px` and `192px`. Icons should be saved in the `public` folder of your app. You can use a service like [this](https://maskable.app/editor)

Feel free to look through all the additional [properties](https://web.dev/add-manifest/#manifest-properties) and customize them for your app! 

Once you're satisfied with the shape of this object, we can run `npm run build` from the `client` to create a local build folder to inspect what the plugin will generate for us. We should then link the generated `manifest` file in our `index.html`.

```html
<link rel="manifest" href="manifest.webmanifest">
```

Once we push these changes to GitHub, and give Vercel some time to build and redeploy, we can test it on a mobile device! 