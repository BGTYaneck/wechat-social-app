import supabase from './supabase';

export async function loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
}

export async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if (error) throw error;
}

export async function registerWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
}
export async function loginWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
    });
    if (error) throw error;
}
