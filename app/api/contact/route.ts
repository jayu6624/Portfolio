import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate form input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Create a transporter with improved SSL settings
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Add these options to fix SSL certificate issues
      tls: {
        rejectUnauthorized: false, // This disables certificate validation
      },
      secure: true, // Use secure connection
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: 'jaydeeprathod6624@gmail.com',
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Add reply-to field with the sender's email
    };

    // Send email with better error handling
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Nodemailer specific error:', emailError);
      throw emailError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
