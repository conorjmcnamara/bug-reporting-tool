# Bug Reporting Tool

A basic Vue.js bug reporting web application that uses Puppeteer and Jest for testing.
Each submitted/resolved bug can be uniquely identified with their respective ID.
The test script ```site.test.js``` produces a .txt report of the test logs.

## Installation

### Prerequisites
- Node.js and npm - [install](https://nodejs.org/)

### Running the Application
Run the following commands:

```bash
# Clone the repository
$ git clone https://github.com/conorjmcnamara/bug-reporting-tool.git

# Change directory
$ cd bug-reporting-tool

# Install dependencies
$ npm install

# Start the development server
$ npm run serve
```

Open http://localhost:8080 to view it in the browser.

### Testing
Run the following command from the ```bug-reporting-tool``` root directory:

```bash
# Start test session
$ npm run test
```

## Resources
- [Vue.js](https://vuejs.org/)
- [Puppeteer](https://pptr.dev/)
- [Jest](https://jestjs.io/)