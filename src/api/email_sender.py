import smtplib

def send_email(to_email, subject, body):
    # Replace with your email credentials (securely stored)
    sender_email = 'your_email@example.com'
    sender_password = 'your_password'

    try:
        message = f"Subject: {subject}\n\n{body}"
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(sender_email, sender_password)
            smtp.sendmail(sender_email, to_email, message)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False