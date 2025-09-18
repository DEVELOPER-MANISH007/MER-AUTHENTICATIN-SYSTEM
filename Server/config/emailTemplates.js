// Modern Email Templates with Tailwind-like styling
export const EMAIL_VERIFY_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            width: 60px;
            height: 60px;
            background-color: #ffffff;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }
        .title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .subtitle {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 20px;
            text-align: center;
        }
        .otp-container {
            background-color: #f7fafc;
            border: 2px dashed #e2e8f0;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #2d3748;
            letter-spacing: 8px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .otp-label {
            color: #718096;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            color: #718096;
            font-size: 14px;
            margin: 0;
        }
        .warning {
            background-color: #fef5e7;
            border-left: 4px solid #f6ad55;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .warning-text {
            color: #744210;
            font-size: 14px;
            margin: 0;
}
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔐</div>
            <h1 class="title">Verify Your Email</h1>
        </div>
        
        <div class="content">
            <h2 class="subtitle">Welcome! Please verify your email address</h2>
            
            <p>Thank you for signing up! To complete your registration and secure your account, please use the verification code below:</p>
            
            <div class="otp-container">
                <div class="otp-label">Your verification code:</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-label">This code will expire in 24 hours</div>
            </div>
            
            <p>Enter this code in the verification form to activate your account.</p>
            
            <div class="warning">
                <p class="warning-text">
                    <strong>Security Note:</strong> Never share this code with anyone. Our team will never ask for your verification code.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                If you didn't create an account, please ignore this email.<br>
                This email was sent automatically, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = (otp) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
        padding: 0;
      }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            width: 60px;
            height: 60px;
            background-color: #ffffff;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #f5576c;
        }
        .title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .subtitle {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 20px;
          text-align: center;
        }
        .otp-container {
            background-color: #fef2f2;
            border: 2px dashed #fecaca;
            border-radius: 8px;
            padding: 30px;
          text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #dc2626;
            letter-spacing: 8px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .otp-label {
            color: #991b1b;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            color: #718096;
            font-size: 14px;
            margin: 0;
        }
        .warning {
            background-color: #fef5e7;
            border-left: 4px solid #f6ad55;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .warning-text {
            color: #744210;
            font-size: 14px;
            margin: 0;
      }
    </style>
  </head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔑</div>
            <h1 class="title">Reset Your Password</h1>
        </div>
        
        <div class="content">
            <h2 class="subtitle">Password Reset Request</h2>
            
            <p>We received a request to reset your password. Use the code below to create a new password:</p>
            
            <div class="otp-container">
                <div class="otp-label">Your reset code:</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-label">This code will expire in 15 minutes</div>
            </div>
            
            <p>Enter this code along with your new password to complete the reset process.</p>
            
            <div class="warning">
                <p class="warning-text">
                    <strong>Security Alert:</strong> If you didn't request this password reset, please ignore this email and consider changing your password immediately.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                For security reasons, this code expires quickly.<br>
                This email was sent automatically, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const SIGNUP_WELCOME_TEMPLATE = (userName, email) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            width: 80px;
            height: 80px;
            background-color: #ffffff;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: #10b981;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .title {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .subtitle {
            color: #ffffff;
            font-size: 16px;
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 24px;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        }
        .message {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 20px;
            text-align: center;
        }
        .features {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        .features-title {
            font-size: 18px;
            color: #1f2937;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
        }
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            color: #4b5563;
        }
        .feature-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            font-size: 16px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
        }
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin: 0;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #10b981;
            text-decoration: none;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚀</div>
            <h1 class="title">Welcome to Our Platform!</h1>
            <p class="subtitle">Your journey starts here</p>
        </div>
        
        <div class="content">
            <h2 class="greeting">Hi ${userName}! 👋</h2>
            
            <p class="message">
                Thank you for joining our community! We're thrilled to have you on board and excited about what we'll accomplish together.
            </p>
            
            <p class="message">
                Your account has been successfully created with the email: <strong>${email}</strong>
            </p>
            
            <div class="features">
                <h3 class="features-title">What you can do now:</h3>
                <div class="feature-item">
                    <span class="feature-icon">✅</span>
                    <span>Access all platform features</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🔐</span>
                    <span>Secure your account with verification</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">⚡</span>
                    <span>Enjoy fast and reliable service</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎯</span>
                    <span>Get personalized recommendations</span>
                </div>
            </div>
            
            <p class="message">
                If you have any questions or need help getting started, don't hesitate to reach out to our support team. We're here to help!
            </p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="#" class="social-link">Help Center</a>
                <a href="#" class="social-link">Contact Support</a>
                <a href="#" class="social-link">Privacy Policy</a>
            </div>
            <p class="footer-text">
                Welcome aboard!<br>
                The Team
            </p>
        </div>
    </div>
</body>
</html>
`;

export const WELCOME_TEMPLATE = (userName) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
                          margin: 0;
                                      padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            padding: 40px 20px;
                                          text-align: center;
        }
        .logo {
            width: 60px;
            height: 60px;
                      background-color: #ffffff;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #4facfe;
        }
        .title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
                          margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .subtitle {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 20px;
                                        text-align: center;
        }
        .footer {
            background-color: #f8fafc;
            padding: 30px;
                                        text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer-text {
            color: #718096;
                                          font-size: 14px;
                          margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎉</div>
            <h1 class="title">Welcome Aboard!</h1>
                                          </div>
        
        <div class="content">
            <h2 class="subtitle">Hi ${userName}!</h2>
            
            <p>Welcome to our platform! We're excited to have you on board.</p>
            
            <p>Your account has been successfully created and verified. You can now enjoy all the features of our platform.</p>
            
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                                          </div>
        
        <div class="footer">
            <p class="footer-text">
                Thank you for choosing us!<br>
                This email was sent automatically, please do not reply.
            </p>
        </div>
    </div>
  </body>
</html>
`;
