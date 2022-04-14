import * as fs from 'fs';

export class CommentAnalyzer {
    private file: string;
    private metrics: Array<Metric>=[];

    constructor(file: string) {
        this.file = file;
    }

    addMetric(metric: Metric) {
        this.metrics.push(metric);
    }

    analyze(): Map<string, number> {
        let resultsMap: Map<string, number> = new Map<string, number>();
        
        try {
             let data = fs.readFileSync(this.file, 'utf-8');
             let lineArray: Array<string> = data.split(/[\r\n]+/);

             for (const line of lineArray) {
                for (var metric of this.metrics) {
                    if (metric.passMetric(line)) {
                        this.incOccurance(resultsMap, metric.metricInfo());
                    }
                }
             }
             
        } catch (err) {
            console.log(err);
        }

        return resultsMap;
    }

    private incOccurance(countMap: Map<string, number>, key: string) {
        countMap.set(key, countMap.has(key) ? ((countMap.get(key) ?? 0) + 1) : 1);
    }
}
