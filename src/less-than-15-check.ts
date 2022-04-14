
export class LessThan15Check implements Metric {
    private info: string = 'SHORTER_THAN_15';
    private metricCheckVal: number = 15;

    passMetric(comment: string): boolean {
        return (comment.length < this.metricCheckVal);
    }

    metricInfo(): string {
        return this.info;
    }
}
