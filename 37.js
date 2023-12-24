let input = ``;

/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(rawInput) {
    let [rules, input] = rawInput.split('\n\n');

    let workflows = new Map();
    for(let rawRule of rules.split('\n')) {
        let [ruleName, rawRuleBody] = rawRule.split('{');
        rawRuleBody = rawRuleBody.slice(0, rawRuleBody.length-1);

        let rawSubRules = rawRuleBody.split(',');
        let subRules = [];
        for(let rawSubRule of rawSubRules) {
            if(rawSubRule.includes(':')) {
                let [rawSubRuleRule, rawSubRuleTarget] = rawSubRule.split(':');
                let fieldName = '';
                // let value;
                // let cmpFn;
                for(let i = 0; i < rawSubRuleRule.length; ++i) {
                    if(rawSubRuleRule[i] === '>' || rawSubRuleRule[i] === '<') {
                        let gt = rawSubRuleRule[i] === '>';
                        let targetValue = Number(rawSubRuleRule.substring(i+1));
                        
                        subRules.push(part => {
                            if(!part.has(fieldName)) {
                                return null;
                            }
                            let partValue = part.get(fieldName);
                            if(gt) {
                                if(partValue > targetValue) {
                                    return rawSubRuleTarget;
                                }
                            } else {
                                if(partValue < targetValue) {
                                    return rawSubRuleTarget;
                                }
                            }

                            return null;
                        });
                        break;
                    }

                    fieldName += rawSubRule[i];
                }
            } else {
                subRules.push(_ => {
                    return rawSubRule;
                });
            }
        }

        workflows.set(ruleName, subRules);

    }

    let result = 0;
    for(let part of input.split('\n')) {
        part = part.substring(1, part.length-1);

        let rawCategories = part.split(',');

        let partObj = new Map();
        
        let partSum = 0;
        for(let rawCategory of rawCategories) {
            let [fieldName, fieldValue] = rawCategory.split('=');

            partObj.set(fieldName, Number(fieldValue));
            partSum += Number(fieldValue);
        }

        let rule = 'in';
        while(rule !== 'A' && rule !== 'R') {
            let subRules = workflows.get(rule);

            for(let subRule of subRules) {
                let result = subRule(partObj);

                if(result !== null) {
                    rule = result;
                    break;
                }
            }
        }

        if(rule === 'A') {
            result += partSum;
        }
    }

    return result;
}

console.time()
console.log(doIt(input))
console.timeEnd()
