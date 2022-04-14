
export class ShakerCheck implements Metric {
    private info: string = 'SHAKER_MENTIONS';
    private metricString: string = 'shaker';

    passMetric(comment: string): boolean {
        return (comment.toLowerCase().includes(this.metricString));
    }

    metricInfo(): string {
        return this.info;
    }
}
