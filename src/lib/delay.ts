/* 
Convenience helper. Executes callback after a given delay.
*/

export default function delay(ms : number, callback : () => void) : Promise<void> {
    return new Promise(() => setTimeout(callback, ms));
}