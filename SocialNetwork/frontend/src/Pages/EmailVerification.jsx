import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./EmailVerification.css"; // Make sure this path is correct

const api_url = import.meta.env.VITE_BASE_API_URL;

const STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
    INVALID: "invalid",
};

const EmailVerification = () => {
    console.log("Starting email verification...");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("loading");
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${api_url}/auth/verify?token=${token}`, {
                    method: "GET",
                });
                const responseText = await response.text();
                console.log("Response Text:", responseText);
                if (response.ok) {
                    console.log("Current status:", status);
                    setStatus(STATUS.SUCCESS);
                } else {
                   
                }
            } catch (err) {
                console.error("Error verifying email:", err);
                setStatus(STATUS.ERROR);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setStatus(STATUS.INVALID);
        }
    }, [token, status]);

    return (
        <div className="container">
            {status === "loading" && <p className="message">Verifying your email...</p>}
            {status === "success" && (
                <div className="card">
                    <h1 className="logo">Connect.</h1>
                    <h2 className="title">Email Verified!</h2>
                    <p className="message">Your email has been successfully verified. Please continue to the login page to log into your account.</p>
                    <button onClick={() => navigate("/login")} className="button">
                        Go to Login
                    </button>
                </div>
            )}
            {status === "error" && (
                <div className="card">
                    <h1 className="logo">Connect.</h1>
                    <h2 className="title">Verification Failed</h2>
                    <p className="message">There was an issue verifying your email. Please try again.</p>
                </div>
            )}
            {status === "invalid" && (
                <div className="card">
                    <h1 className="logo">Connect.</h1>
                    <h2 className="title">Invalid Link</h2>
                    <p className="message">The verification link is invalid or missing a token.</p>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;
