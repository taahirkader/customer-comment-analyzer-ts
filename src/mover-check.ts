
export class MoverCheck implements Metric {
    private info: string = 'MOVER_MENTIONS';
    private metricString: string = 'mover';

    passMetric(comment: string): boolean {
        return (comment.toLowerCase().includes(this.metricString));
    }

    metricInfo(): string {
        return this.info;
    }
}
