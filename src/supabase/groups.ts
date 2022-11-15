import { getCurrentUserId } from './auth';
import { uploadFile } from './supabase';

export async function uploadAvatar(file: File, id: string) {
    try {
        await uploadFile(file, 'groupAvatar', id);
    } catch (e) {
        throw e;
    }
    return;
}
