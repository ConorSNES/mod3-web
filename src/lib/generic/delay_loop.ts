import delay from "./delay";

export default class DelayLoop {
    public readonly rate: number;
    public readonly callback: () => void = () => { };
    private promise: Promise<void> | null = null;
    private breakFlag: boolean = false;

    /**
     * Looped form of Delay, storing reference in the scenario it is to be broken or resurrected.
     * 
     * @param rate Rate of callback execution (ms)
     * @param callback Loop body
     */
    constructor(rate: number, _callback: () => void) {
        this.rate = rate;
        this.callback = _callback;
    }


    /**
     * Starts the DelayLoop. 
     * 
     * If called while already active, this function silently fails.
     */
    public start() {
        if (this.promise) return;
        // but sns, why wrap the function pointer in a closure? 
        // without wrapping the function, a promise environment is forwarded onto "this" rather than the captured DelayLoop instance we expect.
        // of course, the only thing that told me that was an RE for callback not existing within the scope of on_loop_end in build. somehow this also falls straight through the typescript compiler!
        this.promise = delay(this.rate, () => { this.on_loop_end() });
    }

    /**
     * Stops the DelayLoop, awaiting the next loop to be finished.
     */
    public break() {
        this.breakFlag = true;
    }

    private on_loop_end() {
        this.callback();
        this.promise = this.breakFlag ? null : delay(this.rate, () => { this.on_loop_end() });
        this.breakFlag = false;
    }
}