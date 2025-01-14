# Social Networking

## Project Description

The **Social Networking** project is an online platform designed to make social life more active and engaging. This social networking site enables users to maintain existing relationships, share messages, and establish new connections with others in the community. It offers robust functionality for user interaction, content sharing, and relationship building.

## Technologies Used

* **Java** - version 17+
* **Spring Boot** - Version 3.4 (Spring Security, Spring Web, Spring Data)
* **JUnit** - Unit testing framework
* **Mockito** - Mocking for unit testing
* **MySQL** - Database management
* **React** - Version 18.0 (React Router DOM, React features)
* **MUI** - Material-UI for responsive styling
* **Docker** - Containerization for consistent deployments.
* **Jenkins** - CI/CD for automated builds, tests, and deployments.

## Features

### Implemented Features:
* User registration and authentication with Spring Security
* Secure user login functionality
* User profile creation and management
* Connect with other users (follow/friend system)
* Post content including text, images, and videos
* Comment on posts
* Like/react to posts
* Search functionality for users, posts, and content

## Getting Started

Clone the repository using the following command:  
```bash
git clone  https://github.com/nordmannt/P2---Social-Media-App---Java-React-AWS/pull/new/main

```

### Setup Instructions

##### Backend Setup:
1. Install Java (JDK 17 or higher).
2. Install and set up a SQL database
3. Configure database settings in `application properties` in the socialmedia folder under the src folder
4. Navigate to the backend directory and build the project
   mac
   ```bash
   cd  backend
   ./mvnw clean install
   ```
   windows
   ```bash
   cd  backend
   .\mvnw clean install
   ```
6. Run the backend server:
   mac
   ```bash
   ./mvnw spring-boot:run
   ```
   windows
   ```bash
   .\mvnw spring-boot:run
   ```
##### Frontend Setup:
1. Install Node.js (version 16 or higher).
2. Navigate to the frontend directory and install dependencies
   ```bash
   cd frontend
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

## Usage
1. Access the application through http://localhost:3000 after inital frontend / backend setup
2. Register a new account or log in with existing credientals
3. Explore
  * Edit your profiile
  * Create posts
  * Interact with other profiles and posts

## Deployment
### Prerequisites
1. Docker: Ensure Docker is installed on your system.
2. MySQL: Set up a MySQL database server with the required schema and credentials.
3. AWS S3: Configure an S3 bucket with appropriate permissions for storing and retrieving media files. Ensure you have your AWS Access Key, Secret Key, Region, and Bucket Name ready.
4. Jenkins: Install and configure Jenkins on your system or server. Install the required plugins like Docker, Git, and Maven.

### Deployment Details
The backend of this project is hosted on an AWS EC2 instance, while the frontend is deployed as a static website on an AWS S3 bucket. The following instructions provide a generalized deployment approach for the backend. Note that this is just one possible method; feel free to adapt it to your specific needs.
### Steps to deploy Backend
1. Use Maven to package the application into a runnable JAR file:
```bash
./mvnw clean package
```
For windows
```bash
.\mvnw clean package
```
After the build completes, the JAR file will be located in the target folder, typically named something like socialnetwork-0.0.1-SNAPSHOT.jar.
2. Use the dockerfile ti build the Docker image:
```bash
docker build -t socialnetwork-backend .
```
3. Run
```bash 
docker run -d -p 8080:8080 \
      -e DB_URL='${DB_URL}' \
      -e DB_USERNAME='${DB_USERNAME}' \
      -e DB_PASSWORD='${DB_PASSWORD}' \
      -e JWT_SECRET='${JWT_SECRET}' \
      -e S3_ACCESS_KEY='${S3_ACCESS_KEY}' \
      -e S3_SECRET_KEY='${S3_SECRET_KEY}' \
      -e S3_REGION='${S3_REGION}' \
      -e S3_BUCKET_NAME='${S3_BUCKET_NAME}' \
      -e MAIL_FROM='${MAIL_FROM}' \
      -e MAIL_HOST='${MAIL_HOST}' \
      -e MAIL_PORT='${MAIL_PORT}' \
      -e MAIL_USERNAME='${MAIL_USERNAME}' \
      -e MAIL_PASSWORDd='${MAIL_PASSWORD}' \
      -e ALLOWED_ORIGINS='${ALLOWED_ORIGINS}' \
      --name socialmedia
```
Replace placeholders like <db_host>, your_jwt_secret, your_aws_access_key, etc., with the actual values.
### Steps tp Deploy Frontend
1. Build the Frontend
Navigate to the frontend directory and build the static assets:
```bash   
   cd frontend
   npm install
   npm run build
```
This will generate a build folder containing the static files.

2. Upload to AWS S3:
   * to the AWS Management Console and select S3.
   * Create a new bucket or choose an existing one.
   * Enable Static Website Hosting for the bucket and specify the entry point (index.html) and error document (index.html).
   * Upload the contents of the build folder to the S3 bucket.
3. Set Bucket Permissions:
* Go to the Permissions tab of the bucket and ensure that the bucket policy allows public read access.
* Example bucket policy:
```json   
{
   "Version": "2012-10-17",
   "Statement": [
   {
   "Sid": "PublicReadGetObject",
   "Effect": "Allow",
   "Principal": "*",
   "Action": "s3:GetObject",
   "Resource": "arn:aws:s3:::your-bucket-name/*"
   }
   ]
}
```
4.	Access the Frontend:
   * static website will now be accessible via the Endpoint URL provided in the S3 bucket’s Static Website Hosting settings.

### Steps to automate the deployement using Jenkins (Optional)
1.	Install Jenkins Plugins 
   * Navigate to Manage Jenkins > Manage Plugins. 
   * Install the following plugins:
   * Docker 
   * Git 
   * Maven Integration
2. Create a Jenkins Pipeline Job 
 * Go to New Item > Pipeline. 
 * Name the job and select Pipeline as the project type.
3.	Configure Source Code Management
 * Add your Git repository URL under the Source Code Management section.
 * Provide the branch name (e.g., main).
4.	Add Build Steps	
 * Use the Jenkinsfiles provided, or create your own Jenkinsfile.
5. Save and Build
 * Save the Jenkins job and click on Build Now to test the deployment pipeline.

## Contributors
<a href="https://github.com/michaelcao512/SocialNetwork/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=michaelcao512/SocialNetwork" />
</a>

## License
This project uses the following license: MIT license

   
