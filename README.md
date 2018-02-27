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

- Discovery:
	- retrieve the most popular news
	- Which month/week is most angry
	- For government or history use
	- Does this presidential statement makes people more angry


## Full Stack Web
- Backend: Manny
	- Ajax, express, js
	- Passing Api
- Frontend & Connecting: Sia & Jiachen
	- set up Api interface
	- Js, html, css
- Bootstrap for graphs
- Jenny’s workshop

## Timeline
**Feb 23rd - March 4th**

- [ ] M 2/23 Set up Tone Analyzer
	- [x] URL
	- [ ] Text
- [ ] S&J 2/23 Set up natural language understanding api
	- [ ] URL
	- [ ] Text
	- [ ] terms
- [ ] (Train watson)
	- [ ] Similar to previous project
	- [ ] Train with biased
- [ ] Level of Bias
	- [ ] Sentiments 2/26
		- [ ] Get all sentiment entities from watson
		- [ ] Check if sentiment is consistent
		- [ ] Reference: https://www.julienphalip.com/blog/identifying-bias-in-the-media-with-sentiment/
	- [ ] Certain biased terms 2/27
		- [ ] Use natural language understanding
		- [ ] Frequency of the use
- [ ] Graph in the frontend 3/1
- [ ] Style 3/1
- [ ] EC
	- [ ] Discovery
		- [ ] Trend
		- [ ] Public sentiment in the past months
		- [ ] User request
- [ ] Debugging
- [ ] Video & Report 3/4
