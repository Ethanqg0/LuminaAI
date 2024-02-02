import { Link } from 'react-router-dom';

export default function ConfirmEmail() {
    const handleResendConfirmation = async () => {
        const email = localStorage.getItem('email');
        try {
            const response = await fetch('http://localhost:3000/resendVerificationEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to resend confirmation email');
            }
    
            // Handle successful response if needed
        } catch (error) {
            console.error('Error resending confirmation email:', error.message);
            // Handle the error appropriately, e.g., show a user-friendly message
        }
    };
    

    return (
        <div className="flex flex-col">
        <h1>Thanks for signing up. Check your email and confirm your address to continue.</h1>
        <a href="https://mail.google.com/mail">Check your email</a>
        <Link to="/login">Login</Link>`  
        <h1 onClick={handleResendConfirmation}>Resend confirmation</h1>
        </div>
    )
}