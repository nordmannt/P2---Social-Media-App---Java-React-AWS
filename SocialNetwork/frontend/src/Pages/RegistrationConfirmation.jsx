import "./RegistrationConfirmation.css";

const RegistrationConfirmation = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 className="logo">Connect.</h1>
        <h2 className="title">Registration Successful!</h2>
        <p className="message">
          Thank you for registering with Connect. Please check your email to verify your account before signing in.
        </p>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
