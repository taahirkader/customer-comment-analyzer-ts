import { CommentAnalyzer } from './comment-analyzer.js';
import { LessThan15Check } from './less-than-15-check.js';
import { MoverCheck } from './mover-check.js';
import { ShakerCheck } from './shaker-check.js';
import { QuestionCheck } from './question-check.js';
import { SpamCheck } from './spam-check.js';
import * as fs from 'fs';

const testFolder: string = 'docs/';
let totalResults: Map<string, number> = new Map<string, number>();
 
function addReportResults(source: Map<string, number>, target: Map<string, number>) {
  source.forEach((value: number, key: string) => {
    target.set(key, target.has(key) ? ((target.get(key) ?? 0) + value) : value);
  });
}

fs.readdir(testFolder, (err: Error|null, fileNames: string[]) => {
  if (err) {
    console.log(err);
  } else {
    let resolvedPromisesArray: Promise<Map<string, number>>[] = [];

    fileNames.forEach(file => {
      let promise: Promise<Map<string, number>> = new Promise<Map<string, number>>((resolve, reject) => {
        let commentAnalyzer: CommentAnalyzer = new CommentAnalyzer(testFolder + file);
    
        commentAnalyzer.addMetric(new LessThan15Check());
        commentAnalyzer.addMetric(new MoverCheck());
        commentAnalyzer.addMetric(new ShakerCheck());
        commentAnalyzer.addMetric(new QuestionCheck());
        commentAnalyzer.addMetric(new SpamCheck());
    
        let fileResults: Map<string, number> = commentAnalyzer.analyze();
        resolve(fileResults);
      });

      resolvedPromisesArray.push(promise);
    });

    Promise.all(resolvedPromisesArray).then((values: Map<string, number>[]) => {
      values.forEach(value => {
        addReportResults(value, totalResults);
      });

      console.log('RESULTS\n=======');
      totalResults.forEach((v: number, k: string) => console.log(k + ' : ' + v));
    });
  }
});
