class Timer {
    private timerDisplay: HTMLDivElement;
    private startBtn: HTMLButtonElement;
    private pauseBtn: HTMLButtonElement;
    private resetBtn: HTMLButtonElement;
    private intervalId: number | undefined = undefined;
    private elapsedSeconds: number = 0;

    constructor(
        timerDisplayId: string,
        startBtnId: string,
        pauseBtnId: string,
        resetBtnId: string
    ) {
        this.timerDisplay = document.getElementById(timerDisplayId) as HTMLDivElement;
        this.startBtn = document.getElementById(startBtnId) as HTMLButtonElement;
        this.pauseBtn = document.getElementById(pauseBtnId) as HTMLButtonElement;
        this.resetBtn = document.getElementById(resetBtnId) as HTMLButtonElement;

        this.startBtn.addEventListener('click', this.startTimer.bind(this));
        this.pauseBtn.addEventListener('click', this.pauseTimer.bind(this));
        this.resetBtn.addEventListener('click', this.resetTimer.bind(this));
    }

    private updateTimerDisplay(): void {
        const hrs = String(Math.floor(this.elapsedSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((this.elapsedSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(this.elapsedSeconds % 60).padStart(2, '0');
        this.timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
    }

    private startTimer(): void {
        if (!this.intervalId) {
            this.intervalId = window.setInterval(() => {
                this.elapsedSeconds++;
                this.updateTimerDisplay();
            }, 1000);
        }
    }

    private pauseTimer(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    private resetTimer(): void {
        this.pauseTimer();
        this.elapsedSeconds = 0;
        this.updateTimerDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Timer('timer-display', 'start-btn', 'pause-btn', 'reset-btn');
});
