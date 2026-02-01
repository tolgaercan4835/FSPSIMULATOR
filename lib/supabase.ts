import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The execution environment for this app does not read from a .env file.
// Secrets like the Gemini API key are injected directly into process.env by the platform.
// To ensure a reliable connection, we are hardcoding the public Supabase credentials here.
// This is safe because the "anon key" is a publishable key, designed to be used in browsers.
const supabaseUrl = "https://przxiyoudvjctogxwkhs.supabase.co";
const supabaseAnonKey = "sb_publishable_WeNFNuSWCjPzPaJtcJMo4g_ASZFQ6b_";


const initializeSupabase = (): SupabaseClient => {
    // If keys are present and valid, create and return the real client.
    if (supabaseUrl && supabaseAnonKey) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }

    // This block now serves as a fallback, but should not be reached with the hardcoded keys.
    console.warn('Supabase anahtarları eksik! Mock modu aktif.');

    // This mock query builder allows for chained calls like .select().eq().single()
    const mockQueryBuilder = {
        select: () => mockQueryBuilder,
        insert: (data: any) => Promise.resolve({ data: [data], error: null }),
        update: (data: any) => Promise.resolve({ data: [data], error: null }),
        eq: (column: string, value: any) => mockQueryBuilder,
        // .single() should return null data to simulate "not found" for checks like premium status.
        single: () => Promise.resolve({ data: null, error: { message: 'Mock mode: Query returned no rows.', code: 'PGRST116', details: '', hint: '' } }),
    };

    const mockClient = {
        from: (table: string) => mockQueryBuilder,
        auth: {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            // Return an error on sign-in attempts in mock mode.
            signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Giriş işlemi önizleme modunda devre dışı bırakıldı.' } }),
            signOut: () => Promise.resolve({ error: null }),
            onAuthStateChange: (callback: any) => {
                // Return a subscription object with an empty unsubscribe method.
                return {
                    data: {
                        subscription: {
                            unsubscribe: () => {},
                        },
                    },
                };
            },
        },
    };

    // Cast to `any` to satisfy the SupabaseClient type.
    return mockClient as any;
};

// Initialize and export the client (real or mock).
export const supabase = initializeSupabase();

// Add a type for the premium_users table for type safety in other parts of the app.
export interface PremiumUser {
    id: number;
    created_at: string;
    email: string;
}