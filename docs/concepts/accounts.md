# Accounts

To start using remote services such as IPFS pinning, Bucket sharing, and Thread APIs, you'll need an account on Textile. Textile provides a simple, password-less account setup. You can create a new account by logging in with your valid email address for the first time.

##### Login

```sh
textile login
Enter your email: you@domain.app█
> We sent an email to you@domain.app. Please follow the steps provided inside it.
```

Go to your inbox and look for the verification email and follow the instructions inside. After complete, your terminal should output a confirmation:


```sh
✔ Email confirmed
> Success! You are now logged in. Initialize a new project directory with `textile init`.
```

That's it, you can now start using Textile, IPFS, and Threads.

##### Create a Team

By default, you'll be on your own in Textile, you'll probably want to create (or join) a team before you start building.

```sh
textile teams add <new team name>
```

##### Switch to Team

To use your new team, you need to use the `switch` command to select your newly created team.

```sh
textile switch
Use the arrow keys to navigate: ↓ ↑ → ← 
? Switch to: 
  ▸ you@domain.app (current)
  <new team name> 
```

##### Invite another member to your team

```sh
textile teams invite
Enter email to invite: other@domain.app█
> Success! We sent other@domain.app an invitation to the new team.
```

##### Join a team

If someone else has already created a team for you to join, you'll receive an invite email. Simply follow the instructions in the email to join and use the new team.

##### List your teams

```sh
textile teams ls
NAME  	        	ID
<new team name> 	f62cdc2b-9404-40ed-8467-ea804fcc35f1

> Found 2 teams

```

##### Create a Project

Teams on Textile may create different Projects. Projects are useful to organize resources or user groups in your app. Creating a new one is simple.

First, navigate to the directory where you'd like to build your project,

```sh
mkdir txtl-project
cd txtl-project/
```

Next, tell Textile to create a project in this directory. Similar to Git, Textile will create a simple config file in this directly under, `.textile/config.yaml`.

```sh
textile projects init my-new-project
> Success! Initialized empty project in /Users/me/txtl-project/.textile
```

Because you are have switched to your team, this project should now be available to other members of your team also.