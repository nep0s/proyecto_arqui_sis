FROM node:18-alpine 

WORKDIR ./broker

COPY . .
RUN npm install
RUN npm install forever -g
RUN npm install mqtt 
RUN npm install fs
RUN npm install pg
# Copy all the files into the container to run the app

# Run command to start the process runing a shell command using node
CMD ["forever", "mqtt.js", "8080"]

# This is for documentation only, the port muyst be exposed manually or in compose definition.
