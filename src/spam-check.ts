
export class SpamCheck implements Metric {
    private info: string = 'SPAM';
    private metricString: string = "((http:\\/\\/|https:\\/\\/)?(www.)?(([a-zA-Z0-9-]){2,}\\.){1,4}([a-zA-Z]){2,6}(\\/([a-zA-Z-_\\/\\.0-9#:?=&;,]*)?)?)";
	
    passMetric(comment: string): boolean {
        return ((comment.toLowerCase().search(this.metricString)) !== - 1);
    }

    metricInfo(): string {
        return this.info;
    }
}
