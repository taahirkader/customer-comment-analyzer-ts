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

try {
  let fileNames: string[] = fs.readdirSync(testFolder);

  fileNames.forEach(file => {
    let commentAnalyzer: CommentAnalyzer = new CommentAnalyzer(testFolder + file);
  
    commentAnalyzer.addMetric(new LessThan15Check());
    commentAnalyzer.addMetric(new MoverCheck());
    commentAnalyzer.addMetric(new ShakerCheck());
    commentAnalyzer.addMetric(new QuestionCheck());
    commentAnalyzer.addMetric(new SpamCheck());

    let fileResults: Map<string, number> = commentAnalyzer.analyze();
    addReportResults(fileResults, totalResults);
  });
} catch (err) {
  console.log(err);
}

console.log('RESULTS\n=======');
totalResults.forEach((v: number, k: string) => console.log(k + ' : ' + v));

