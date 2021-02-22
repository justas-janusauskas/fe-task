# Password Health

## Task completion info

While I did try my best to fix all the issues I found and fullfill as much of the requirements, as I could, I would still like to point out some things, that I would improve, if this was a real assignment, and not a recruitment task, and I had the ability to spend more time on this.

* CSS - I did not spend too much time on it, except fixing some obvious issues and creating CSS modules for importing component-specific classes. However, I do not have problems working with CSS and, if needed, I would gladly do some more CSS-oriented task, showcasing my abilities
* Tests - I did add some tests, on some utils functions and on some React components, however, if this was a real task and I had more time, I would also add tests for API functions and for Router HOCs
* TSLint - I tried to organize the code as much as I could. However, in different projects there can be different levels of TSLint/ESLint rules and it would be no problem to follow much stricter formatting rules, if needed

## Setup

* clone project
* run `yarn`
* run `yarn start`. make sure required ports are available
* open `http://localhost:8080/`
* Enter your mocked user credentials
    
    *username:* `admin`

    *password:* `admin`

## Scripts

 `yarn start:server` - starts mocked backend.

 `yarn start:web` - starts dev server.
 
 `yarn start` - starts both dev server and mocked backend.
 
 `yarn test` - runs tests in project.


## Information

Don't forget that mocked backed server doesn't store your tokens in database they are stored in memory, so your tokens will be invalid after server restart.