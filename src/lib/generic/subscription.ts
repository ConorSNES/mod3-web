

/**
 * Modification of Set to act through the subscriber pattern.
 */
export default class Subscription extends Set<() => void> {
    /**
     * Alias of add. Subscribes to this emitter.
     */
    public subscribe = this.add;

    /**
     * Alias of delete. Unsubscribes from this emitter.
     */
    public unsubscribe = this.delete;

    /**
     * Emit signal to all registered subscribers.
     */
    public emit() {
        for (const v of this.keys()) v();
    }
}