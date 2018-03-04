# CS89-infossato

## Set up

The web app uses these frameworks: node.js, express , ibm tone_analyzer

To run the app,
1. Open command line
2. Navigate to the folder where you have the all project files unzipped
3. Install the necessary frameworks to create and enabling environment
The following task are performed on the command line
a. Download Ibm node dependencies
$ npm install watson-developer-cloud

b. Install node.js
$ npm install

c. Install express: download it here http://expressjs.com/en/starter/installing.html and follow the instructions

$ npm init
$ npm install express --save


4. run the server
$ node index.js

5. open app browser
enter http://localhost:8081/ on your browser

## API used
- Tone Analyzer
	- Emotion
- Natural Language Understanding
	- Sentiment
	- Emotion
	- Key Concepts in the user input

- Discovery:
	- Public sentiment regarding the particular concept extracted from the user input
	- retrieve top5 related news


## Full Stack Web
- Backend
	- Ajax, express, js
	- Passing Api
- Frontend & Connecting
	- set up Api interface
	- Js, html, css
	- Bootstrap for graphs

## Timeline
**Feb 23rd - March 4th**

- [x] M 2/23 Set up Tone Analyzer
	- [x] URL
	- [x] Text
- [x] S&J 2/23 Set up natural language understanding api
	- [x] URL
	- [x] Text
	- [x] terms
- [x] Graph in the frontend 3/1
- [x] Style 3/1
- [x] EC
	- [x] Discovery
		- [x] Public sentiment regarding similar topic
		- [x] Related Articles
- [ ] Debugging
- [ ] Video & Report 3/4
