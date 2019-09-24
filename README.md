# Valley Tech Con 2019&mdash;"Offline First" Demo App

This repo contains the code for an app designed to demonstrate the "offline first" approach. In a nutshell, "offline first" development means starting your analysis with the assumption that the internet connection your app's users will have is flaky and/or unreliable. That means the app needs to intelligently and aggressively cache all of the resources it needs to operate. You may not be able to deliver 100% of the app's functionality offline (e.g. you can't do chat or other real-time things in offline mode), but if followed correctly, the app should provide significant utility to its users, even if there is no internet.

## The App

This app essentially mirrors the content of [the official conference website](https://valleytechcon.com). Users will have access to the conference schedule and info about the talks, speakers, and sponsors. In addition, the app allows users to rate each event and/or tweet about it easily. If you'd like to see it live it can be accessed/installed at [**https://vtc.morphatic.com**](https://vtc.morphatic.com).

![Valley Tech Con 2019](/frontend/public/img/splash.png)

The app is broken up into a backend API and a frontend SPA/PWA website. The backend is built with [FeathersJS](https://feathersjs.com), and the frontend is built with [VueJS](https://vuejs.org), [Vuetify](https://vuetifyjs.com), and makes heavy use of [`feathers-vuex`](https://feathers-vuex.feathers-plus.com).

## DIY

If you'd like to download the code and get it running locally for your own experimentation and testing, here's what you should do (more details follow this summary):

1. Install pre-requisites
    1. [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
    2. [NodeJS](https://nodejs.org/en/) (recommended v10.x LTS)
    3. [Git](https://git-scm.com)
    4. [`mkcert`](https://github.com/FiloSottile/mkcert) (you'll need this to run a local HTTPS server)
    5. [VSCode](https://code.visualstudio.com) (or any other code editor)
    6. [MongoDB Compass](https://www.mongodb.com/products/compass) (optional, but nice for seeing what's in the DB)
    7. [ngrok](https://ngrok.com/download) (also optional, see details below)
2. Edit your `hosts` file so you can use a real domain name on your dev server
3. Clone this repo, or better yet, fork this repo and clone your fork
4. Create SSL certificates in both the `backend` and `frontend` directories
5. Run `npm install` in both the `backend` and `frontend` directories
6. Add a `config` directory to the backend with the settings described below
7. Make sure MongoDB is running, and restore the database
8. Start up the API server
9. Start up the frontend server
10. Visit the app in your browser at [https://vtc.test:8080](https://vtc.test:8080)

## Additional Details

In case you're not familiar with this particular tech stack, here are some additional details to help you get up and running. I'm assuming you already are familiar with the basics of developing apps with NodeJS and VueJS. If not, there are lots of great tutorials out there. For FeathersJS, their website has a great tutorial, as well. I'll include a broader set of links below.

### Using `mkcert` to create SSL certificates and editing your `hosts` file

[`mkcert`](https://github.com/FiloSottile/mkcert) is "a simple tool for making locally-trusted development certificates." It works on any platform, and allows you to run a local dev server (usually http://localhost) in HTTPS mode. I don't have anything to add to the instructions on their site other than that for this particular app, **after** you've installed `mkcert` and downloaded this repo, you should do the following from the command line:

```bash
~ $ cd valley-tech-con/backend
backend $ mkcert api.vtc.test
Using the local CA at "/Users/yourusername/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "api.vtc.test"

The certificate is at "./api.vtc.test.pem" and the key at "./api.vtc.test-key.pem" ✅

backend $ cd ../frontend
frontend $ mkcert vtc.test
Using the local CA at "/Users/yourusername/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "vtc.test"

The certificate is at "./vtc.test.pem" and the key at "./vtc.test-key.pem" ✅
```

This will create SSL certificates that are trusted by your local machine so you won't be bothered by security warnings in your browser.

The next step is to add your test domains to your `hosts` file. Here is [a tutorial on how to edit your `hosts` file on Windows, Mac, or Linux](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/). If you've never done this before **MAKE SURE YOU UNDERSTAND WHAT YOU'RE DOING**. Although it's pretty easy to fix it, if you screw up your `hosts` file, you could make it impossible to visit some websites. For this app, add the following two lines at the bottom of your `hosts` file:

```bash
127.0.0.1 vtc.test
127.0.0.1 api.vtc.test
```

> NOTE: If you'd like to use a _different_ domain name for running your app locally, you'll have to change the domain name in the configuration files. For the backend, that's in `config/default.json`, and for the frontend that's in `.env.local`. You'd also use your desired name in the commands above.

### Restoring the Database

There's a snapshot of the Valley Tech Con 2019 database included in this repo. You'll want to put this data in your local MongoDB before you start up the app for the first time. To do that:

```bash
~ $ cd valley-tech-con/backend
backend $ mongorestore dump/
2019-09-24T18:45:44.643+0000	building a list of dbs and collections to restore from dump dir
2019-09-24T18:45:44.647+0000	reading metadata for valley_tech_con_2019.speakers from dump/valley_tech_con_2019/speakers.metadata.json
2019-09-24T18:45:44.648+0000	reading metadata for valley_tech_con_2019.events from dump/valley_tech_con_2019/events.metadata.json
2019-09-24T18:45:44.650+0000	reading metadata for valley_tech_con_2019.sponsors from dump/valley_tech_con_2019/sponsors.metadata.json
2019-09-24T18:45:44.662+0000	restoring valley_tech_con_2019.speakers from dump/valley_tech_con_2019/speakers.bson
2019-09-24T18:45:44.678+0000	restoring valley_tech_con_2019.events from dump/valley_tech_con_2019/events.bson
2019-09-24T18:45:44.686+0000	restoring valley_tech_con_2019.sponsors from dump/valley_tech_con_2019/sponsors.bson
2019-09-24T18:45:44.691+0000	restoring indexes for collection valley_tech_con_2019.sponsors from metadata
2019-09-24T18:45:44.692+0000	restoring indexes for collection valley_tech_con_2019.speakers from metadata
2019-09-24T18:45:44.694+0000	restoring indexes for collection valley_tech_con_2019.events from metadata
2019-09-24T18:45:44.696+0000	finished restoring valley_tech_con_2019.speakers (23 documents)
2019-09-24T18:45:44.696+0000	finished restoring valley_tech_con_2019.sponsors (14 documents)
2019-09-24T18:45:44.696+0000	finished restoring valley_tech_con_2019.events (22 documents)
2019-09-24T18:45:44.696+0000	done
```

It's really only one command, but this is what the output should look like. The `mongorestore` command should have been installed on your system when you installed MongoDB.

### Configuring the API server

It's customary NOT to include your server's configuration files in your repository since they frequently contain secret API keys and other sensitive information. As such, whenever you clone a repo like this one, you may need to create and/or edit that configuration. In this case, you'll want to `cd` into the `backend` folder, create a `config` directory (i.e. `mkdir config`) and inside that directory, create a file called `default.json`. The contents of that file should be:

```json
{
  "host": "api.vtc.test",
  "paginate": {
    "default": 10,
    "max": 50
  },
  "port": 3030,
  "public": "../public/",
  "mongodb": "mongodb://localhost:27017/valley_tech_con_2019",
  "ngrok-token": "your_ngrok_api_token_if_you_have_one_(see_below)"
}
```

Actually, none of this info is particularly sensitive, except maybe the ngrok token.

### Setting up ngrok

ngrok is a tool that allows you to make a locally-running webserver public and available to anyone with the correct URL. You don't really need this for this particular project, but I find it's useful for testing sometimes, particularly if I want to share my work with others. This project has commands that allow you to start both the front and backend servers in "ngrok" mode, i.e. `npm run dev:ngrok` and `npm run serve:ngrok` respectively. You can [download ngrok from their website](https://ngrok.com/download). In their tutorial, they demonstrate running the command directly from the directory where you downloaded it, but I prefer to install mine in a place where it is available globally on my system. To do that:

1. Unzip [the file you downloaded from ngrok](https://ngrok.com/download)
2. Copy all of the files that were downloaded to a directory that is on your `PATH`. Here is [a tutorial for Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/), and here is [a tutorial for OSX](https://hathaway.cc/2008/06/how-to-edit-your-path-environment-variables-on-mac/), although for OSX, I typically just move the files into the `/usr/local/bin` folder rather than editing the path.
3. Create a free account at ngrok and register the domains you'd like to use for your local servers. (Sorry, I've already reserved `https://vtc-api.ngrok.io`, but I'm sure you can think of something cool.)

### Starting up the servers

There are TWO servers that need to be running in order to test the app. One for the backend API and one for the frontend. I typically open two terminal windows (actually, two tabs in my preferred terminal [iTerm2](https://www.iterm2.com/)). In each window, `cd` into the appropriate directory, i.e. `valley-tech-con/backend` and `valley-tech-con/frontend` and run the command to start the servers, i.e. `npm run dev` for the backend, and `npm run serve` for the frontend. If everything has been set up as I've described, you should be able to visit your app at [https://vtc.test:8080](https://vtc.test:8080)!

If you want to use the ngrok versions of the command, you'll need to set up at least a reserved API URL because the frontend needs to know the URL to use. Once you've reserved it from your ngrok account, add that URL to `valley-tech-con/backend/config/default.json` (as well as your ngrok token). Also, you'll need to update the API URL variable in `valley-tech-con/frontend/.env.ngrok` with your reserved API URL. Then when you start the servers, you should use `npm run dev:ngrok` and `npm run serve:ngrok` respectively.

## Additional Questions

If I haven't explained something clearly enough here, please feel free to [ask a question via the issues tab above](https://github.com/morphatic/valley-tech-con/issues).

## Additional Resources

Here are some other resources that may slake your curiosity:

* The [slides from my talk on "offline first"](https://slides.com/morphatic/offline-first)
* [FeathersJS docs on offline first](https://auk.docs.feathersjs.com/guides/offline-first/readme.html)
  These are out of date, but the philosophy is sound
* The ["official" offline first website](http://offlinefirst.org/)
  I don't know how active this is, either as a site, or as a community, but I find the idea compelling and relevant.
* The [FeatherJS docs](https://docs.feathersjs.com)
* The [`feathers-vuex` docs](https://feathers-vuex.feathers-plus.com)
  These were a bit out of date at the time I wrote this (just prior to the launch of `feathers-vuex` v2.0), but I expect they will be updated when the new version is finally released.
* The [MongoDB docs](https://docs.mongodb.com/)
  If you've never used a NoSQL database before. It takes some getting used to.
* The [Mongoose docs](https://mongoosejs.com/docs/api.html)
  Mongoose is a NodeJS library designed to make it easier to work with MongoDB. It's built and maintained by Automattic, the folks who created WordPress. It also integrates easily into FeathersJS.
* The [VueJS official guide](https://vuejs.org/v2/guide/)
  I prefer Vue to React. If you've never used it, the VueJS site is the place to start learning the basics.
* The [Vue CLI guide](https://cli.vuejs.org/guide/)
  If you're going to develop with Vue, you'll soon want to use their tooling.
* The [Vuetify docs](https://vuetifyjs.com/en/getting-started/quick-start)
  Vuetify is a UI library that implements the Material Design spec for VueJS apps. I find it indispensable.
* The [Material Design docs](https://material.io/)
  The amassed wisdom of Google's research into how to build usable interfaces.
* [Vue Mastery](https://www.vuemastery.com/)
  My favorite set of tutorials for learning about everything Vue related. Their paid subscription is worth it while you're learning.

## Thank you!

Thank you for taking the time to investigate this stuff. Let me know how you found it, and especially let me know if you build anything cool that I would want to use!!
