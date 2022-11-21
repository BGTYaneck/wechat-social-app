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

export async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getCurrentUserId(): Promise<string | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error?.message === 'invalid claim: missing sub claim') return null;
    if (error) throw error;
    if (data.user?.id) {
        return data.user.id;
    }
    return null;
}
