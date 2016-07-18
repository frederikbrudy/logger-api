#Logger API

A simple node.js application for running a logger API. It will log all data that is posted to its endpoint. Received data is appended as a new line to a file.

##Installation

You need to install [Node.js](https://nodejs.org/en/).

Clone this repository
```sh
git clone https://github.com/kopfnuss/logger-api
```

On your local machine change into the directory and initialise using npm
```sh
npm init
```

##Setup
In the **`index.js`** the following two variables can be edited: `port` and `filename`. 

`port` defines the port on which the application will run on. When set to `false`, defaults to 3002.

`filename` sets the filename the data will be appended to. If set to `false` defaults to the timestamp of the second when the application was initially started.

##Usage
Run the application:

```sh
node index.js
```

The application offers one endpoint. It accepts HTTP `POST` requests to the endpoint `/log`.

The body can contain two fields: `line` and `data`. 

`line` (string): The content will be appended as a new line to the log-file.
`data`: can be any json data. It will be stringified and appended as a new line to the log file. 

First the contents of `line` (if existent) are added to the log file, the the contents of `data` (if existent).

A success of error message is returned.

##Example

Here is an example POST request using jQuery. A full example can be found in `public/test.html`.

```javascript
var data = {
    line: 'This string;will be-added;as a line.', //content will be appended to the file
    data: {test: 1, moreContent: "yhjkd"} //data will be stringified and appended to line
};
$.ajax({
    type: "POST",
    url: "/log",
    data: data,
    success: function(result) {
        console.log('success', result);
    },
    error: function(err) {
        console.log('error', err);
    }
});
```

##Author
Frederik Brudy
<fb@fbrudy.net>
