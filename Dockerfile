FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Adding environment variables
ENV JWT_SECRET=76c3d6492bdb1248dd4830f1a1358ece97cce17147c759433ca1012bb8f95256
ENV JWT_EXPIRES_IN=604800
ENV IAM_ACCESS_KEY=AKIAIGWSNMYLUKVUAO4Q
ENV IAM_SECRET=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
ENV AWS_S3_REGION=us-west-1
ENV S3_BUCKET=abd-bucket-dev
ENV NODE_ENV=production
# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" 