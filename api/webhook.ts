import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// FIX: Declare Buffer to resolve TypeScript error for this Node.js-specific global type.
declare const Buffer: any;

// This is a Vercel Serverless Function
// It will be accessible at `/api/webhook`
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const lemonSqueezySecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
        const rawBody = await getRawBody(req);
        
        // Verify the request signature to ensure it's from Lemon Squeezy
        const hmac = crypto.createHmac('sha256', lemonSqueezySecret);
        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
        const signature = Buffer.from(req.headers['x-signature'], 'utf8');

        if (!crypto.timingSafeEqual(digest, signature)) {
            return res.status(401).json({ error: 'Invalid signature.' });
        }

        const payload = JSON.parse(rawBody);

        // Check if it's a successful subscription creation event
        if (payload.meta.event_name === 'order_created') {
            const userEmail = payload.data.attributes.user_email;

            if (!userEmail) {
                return res.status(400).json({ error: 'User email not found in payload' });
            }

            // Initialize Supabase client with the SERVICE_ROLE_KEY for admin privileges
            const supabaseAdmin = createClient(
                process.env.VITE_SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            );

            // Insert the email into the premium_users table
            const { error: insertError } = await supabaseAdmin
                .from('premium_users')
                .insert({ email: userEmail });

            if (insertError) {
                // Handle potential conflicts, e.g., if the user is already premium
                if (insertError.code === '23505') { // unique_violation
                    console.log(`User ${userEmail} is already a premium user.`);
                    return res.status(200).json({ message: 'User already premium.' });
                }
                throw insertError;
            }

            return res.status(200).json({ message: `Premium access granted for ${userEmail}` });
        }

        // Acknowledge other events without processing
        return res.status(200).json({ message: 'Webhook received but not processed.' });

    } catch (error) {
        console.error('Webhook Error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Helper to get raw body for signature verification
async function getRawBody(req) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

// Disable body parsing by Vercel, we need the raw body
export const config = {
    api: {
        bodyParser: false,
    },
};