# Use a small official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install production dependencies only (use npm ci for reproducible installs)
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Build step (if you have a build step uncomment)
# RUN npm run build

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Default port (change if your app uses a different port)
ENV PORT=3000
EXPOSE 3000

# Start the app
CMD ["npm", "install"]
CMD ["node", "app.js"]
