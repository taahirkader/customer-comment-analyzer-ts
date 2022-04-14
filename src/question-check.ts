
export class QuestionCheck implements Metric {
    private info: string = 'QUESTIONS';
    private metricString: string = '?';

    passMetric(comment: string): boolean {
        return (comment.toLowerCase().includes(this.metricString));
    }

    metricInfo(): string {
        return this.info;
    }
}
