import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';


export const db = GUN(); // Database

export const user = db.user().recall({sessionStorage: true}); // Gun User

export const username = writable(''); // Current User's username

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias);
    console.log(`signed in as ${alias}`);
});