export const verificationEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
              padding: 20px;
              border: 1px solid #e1e4e8;
          }
          .header {
              background-color: #28a745;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 28px;
              font-weight: 600;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              color: #495057;
              line-height: 1.6;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 24px;
              color: #28a745;
              background: #e9f7e8;
              border: 2px dashed #28a745;
              padding: 12px;
              text-align: center;
              border-radius: 6px;
              font-weight: 700;
              letter-spacing: 3px;
          }
          .footer {
              background-color: #f8f9fa;
              padding: 15px;
              text-align: center;
              color: #868e96;
              font-size: 12px;
              border-top: 1px solid #e1e4e8;
          }
          p {
              margin: 0 0 15px;
          }
          .footer a {
              color: #868e96;
              text-decoration: none;
          }
          .footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello {username},</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;

export const welcomeEmailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f8f9fa;
              color: #495057;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
              padding: 20px;
              border: 1px solid #e1e4e8;
          }
          .header {
              background-color: #007bff;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 28px;
              font-weight: 600;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button-container {
            text-align: center;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              text-align: center;
              font-size: 16px;
              font-weight: 600;
              transition: background-color 0.3s, transform 0.3s;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              background-color: #f8f9fa;
              padding: 15px;
              text-align: center;
              color: #868e96;
              font-size: 12px;
              border-top: 1px solid #e1e4e8;
          }
          p {
              margin: 0 0 15px;
          }
          .footer a {
              color: #868e96;
              text-decoration: none;
          }
          .footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Our Community!</div>
          <div class="content">
              <p class="welcome-message">Hello {username},</p>
              <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
              <p>Here’s how you can get started:</p>
              <ul>
                  <li>Explore our features and customize your experience.</li>
                  <li>Stay informed by checking out our blog for the latest updates and tips.</li>
                  <li>Reach out to our support team if you have any questions or need assistance.</li>
              </ul>
              <div class="button-container">
                  <a href="#" class="button">Get Started</a>
              </div>
              <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
