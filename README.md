![](https://i.ibb.co/4mQ3f7G/tag-master-icon.png)

# Tag Master

<!--It's a simple application that shows how to create an Agent App extension with the use of the **LiveChat Rest API**.-->

**Tag Master** allows you to create, view, and delete [tags](https://www.livechatinc.com/kb/tagging-chats-and-tickets/) and [canned responses](https://www.livechatinc.com/kb/canned-responses/) in an easy and predictable way.

# Preview
​
![LiveChat Tag Master app preview](https://cdn.livechat-files.com/api/file/developers/img/dps/21351ec2-fa9f-4ee7-b9bb-df0af67aab56.png)

# Code along

This is a training application that we use in our video course: [the Practical Guide to Building LiveChat Apps](https://developers.livechat.com/building-apps-crash-course/). During the course, you'll learn:

- How to create an app from start to finish.
- Best programming practices.
- How to effectively use the LiveChat API.
- Superb developer tools to facilitate your workflow.
- Different hosting options and how to use them.
- How to excel at the LiveChat app review.
- Monetization options at the LiveChat Developer Program.

If this sparks your interest, be sure to visit [the course website](https://developers.livechat.com/building-apps-crash-course/)!

## Branch breakdown

For the video course purposes, this repository is divided into four branches:

1. `master`: This branch includes the whole code for this application where both API functionalities and authorization are implemented.
2. `base`: This branch includes basic files such as `index.js` and `package.json` so you can smoothly begin working on the project.
3. `authorization`: This branch includes implemented [LiveChat Accounts SDK](https://developers.livechat.com/docs/authorization/sign-in-with-livechat#accounts-sdk) authorization.
4. `apiCalls`: This branch includes implemented communication with the [LiveChat Configuration API](https://developers.livechat.com/docs/management/configuration-api).

# App setup

## Before you start

To use this application in your LiveChat dashboard, you'll need to create your own app in [Developers Console](https://developers.livechatinc.com/console) and get the **Client Id**.

## Getting started

1. Go to [Apps](https://developers.livechatinc.com/console/apps) in [Developers Console](https://developers.livechatinc.com/console).
2. Click **New App** and give it an **App Name**.
3. Choose the **LiveChat** product as the product you want to build for.
4. Go to **Building Blocks**.
5. Add **App Authorization** and mark it as _JavaScript App_. Your **Client Id** will be displayed there.
6. Add scopes `canned_responses_read`, `canned_responses_write`, `tags--all:rw`, `tags--groups:rw` to the **App scopes and API access** box.
7. Fetch the **Tag Master** app repository.
8. In the app directory, do the following steps :

   - Install dependencies (`npm install`).
   - In your project, go to `src/utils/config.js` and replace `client_id` with your own **Client Id** (the one from **Step 5**).
   - Run your app (`npm start`).

9. Add your app's url (for example: `https://localhost:3000`) in these two locations:

   - **Redirect URI whitelist**
   - **Agent App Widgets**

10. In **Private installation**, click **Install app**.

You should now be able to use **Tag Master** with LiveChat.

# How it works

[Agent App Widgets](https://developers.livechat.com/docs/extending-agent-app) are web applications loaded inside the LiveChat Agent App. All agents can interact with the widget during chats with customers. The widget itself is displayed in the Agent’s App right sidebar.

To get information such as tags, you need to use [Configuration API](https://developers.livechat.com/docs/management/configuration-api).

In order to pull data from our server, you need to include an **access_token** in all the requests. You can get it using one of the [agent authorization flows](https://developers.livechat.com/docs/authorization/agent-authorization).

# More sample apps

Experiment more with our different sample apps:
 - [Progress](https://github.com/livechat/progress-app) - widget for helping you monitor statistics of your team, such as chat ratings, response times, and chatting times.
 - [Supervisor](https://github.com/livechat/supervisor-app) - widget for helping you monitor weekly progress of your agents and also their availability.
 - [Sample Redirect App with the redirect authorization flow](https://github.com/livechat/sample-app-redirect-auth)
 - [Sample Popup App with the popup authorization flow](https://github.com/livechat/sample-app-popup-auth)

# Feedback

If you find some bugs, please create an issue in this repo. We'll try to fix it ASAP!

# If you're new to LiveChat

**LiveChat** is an online customer service software with live support, help desk software, and web analytics capabilities. It's used by more than 37,000 companies all over the world. Read more about [LiveChat for Developers](https://developers.livechatinc.com/) and [join our Discord](https://discord.com/invite/NcfJu3a9kM) to learn, get inspired, and meet other developers.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
