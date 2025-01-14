# Set the working directory inside the container
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the JAR file into the container
COPY target/socialmedia-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]