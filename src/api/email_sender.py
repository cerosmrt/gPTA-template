import smtplib  # Import the SMTP library for sending emails
import os  # Import the os library for environment variable access

def send_email(to_email, subject, body):
    # Retrieve email credentials from environment variables
    sender_email = os.getenv('EMAIL_USER')  # Get the sender's email address
    sender_password = os.getenv('EMAIL_PASSWORD')  # Get the sender's email password

    # Check if email credentials are available
    if not sender_email or not sender_password:
        print("Email credentials are not set.")  # Print error message if credentials are missing
        return False  # Return False indicating failure to send email

    try:
        # Create the email message
        message = f"Subject: {subject}\n\n{body}"  # Format the email message with subject and body

        # Connect to the Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:  # Establish a connection to the SMTP server
            smtp.starttls()  # Upgrade the connection to a secure encrypted TLS connection
            smtp.login(sender_email, sender_password)  # Log in to the SMTP server with the sender's credentials
            smtp.sendmail(sender_email, to_email, message)  # Send the email from sender to recipient

        return True  # Return True indicating the email was sent successfully

    except Exception as e:
        # Handle any exceptions that occur during the email sending process
        print(f"Error sending email: {e}")  # Print the error message
        return False  # Return False indicating failure to send email
