import { getCurrentUserId } from "./auth";
import supabase from "./supabase";


export async function getFriendsList(id?:string|null) {
    if (id === undefined) id = await getCurrentUserId();
    if (id === null) return;
    const {data, error} = await supabase.from('friends').select().or(`sender.eq.${id},recipient.eq.${id}`).eq('accepted',true)
    if (error) throw error;
    return data;
}

export async function getFriendRequests() {
    const {data, error} = await supabase.from('friends').select().eq('recipient',await getCurrentUserId()).eq('accepted',false)
    if (error) throw error;
    return data;
}

export async function acceptFriendRequest(id:string) {
    const {data, error} = await supabase.from('friends').update({accepted: true}).eq('recipient',await getCurrentUserId()).eq('sender',id)
    if (error) throw error;
}

export async function declineFriendRequest(id:string) {
    const {data, error} = await supabase.from('friends').delete().match({recipient: await getCurrentUserId(), sender: id})
    if (error) throw error;
}