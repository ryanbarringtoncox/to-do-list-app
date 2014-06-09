##Run Locally
==============

To run locally, clone Semmy Purewal's excellent node-dev-bootstrap repo and build your virtual vagrant environment with node.js, mongodb, shared folder, port-forwarding, etc.

    git clone https://github.com/semmypurewal/node-dev-bootstrap
    cd node-dev-bootstrap
    vagrant up
    
Then clone this repo in the app/ dir.

    cd app
    git clone https://github.com/ryanbarringtoncox/to-do-list-app
    
Ssh into virtual server, install packages and start the app like this.

    vagrant ssh
    cd app/to-do-list
    sudo npm install
    node app.js
    
You'll see a message in the console that reads "Server running on port 3000..."  Open http://localhost:3000 in your browser to add/remove to-do items.
