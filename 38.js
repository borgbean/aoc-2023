let input = ``


/**
 * @typedef {object} Workflow
 * @property {string} target the workflow we go to next
 * @property {WorkflowCondition|null} condition
 */

/**
 * @typedef {object} WorkflowCondition
 * @property {boolean} gt is a greater than op
 * @property {string} fieldName field to compare targetValue against
 * @property {number} targetValue the target number */

/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(rawInput) {
    /** @type {Map<string, Workflow[]>} */
    let workflows = new Map();
    /** @type {Map<string, string[]>} */
    let adjList = new Map();

    parseInput(rawInput, workflows, adjList);


    let ways = 0;
    for (let workflowName of workflows.keys()) {
        /**
         * @type {Map<string, [number, number]>}
         */
        let curAllowed = new Map(Object.entries({
            x: [1, 4000],
            m: [1, 4000],
            a: [1, 4000],
            s: [1, 4000]
        }));
        for (let subRule of workflows.get(workflowName)) {
            if (subRule.target === 'A') {
                let tmpAllowed = structuredClone(curAllowed);

                adjustAllowed(false, tmpAllowed, subRule);

                ways += dfs(adjList, workflows, tmpAllowed, workflowName);
            }
            if (!adjustAllowed(true, curAllowed, subRule)) {
                break;
            }
        }
    }

    return ways;
}

console.time()
console.log(doIt(input))
console.timeEnd()



/**
 * 
 * @param {Map<string, string[]>} adjList 
 * @param {Map<string, Workflow[]>} workflows 
 * @param {Map<string, [number, number]>} allowedRanges 
 * @param {string} workflowTarget 
 * @returns 
 */
function dfs(adjList, workflows, allowedRanges, workflowTarget) {
    if (workflowTarget === 'in') {
        return calculateCombinations(allowedRanges);
    }

    let ways = 0;
    //find workflow sources for target
    for (let sourceWorkflowName of adjList.get(workflowTarget)) {
        for (let rule of workflows.get(sourceWorkflowName)) {
            if (rule.target === workflowTarget) {
                let tmpAllowed = structuredClone(allowedRanges);
                adjustAllowed(false, tmpAllowed, rule);
                ways += dfs(adjList, workflows, tmpAllowed, sourceWorkflowName);
            }
            if (!adjustAllowed(true, allowedRanges, rule)) {
                break;
            }
        }
    }

    return ways;
}

/**
 * 
 * @param {boolean} invert true if we're inverting rule (i.e. a>5 becomes a<=5)
 * @param {Map<String, [number, number]>} allowedRanges 
 * @param {*} rule
 * @returns 
 */
function adjustAllowed(invert, allowedRanges, rule) {
    if (rule.condition === null) { return false; }

    let { gt, fieldName, targetValue } = rule.condition;

    let rangeAllowed = allowedRanges.get(fieldName);
    let [l, r] = rangeAllowed;

    if (gt) {
        if (!invert) {
            if (r <= targetValue) {
                return false;
            }
            rangeAllowed[0] = Math.max(l, targetValue + 1);
        } else {
            if (rangeAllowed[0] >= targetValue) {
                return false;
            }
            rangeAllowed[1] = Math.min(r, targetValue);
        }
    } else {
        if (!invert) {
            if (l >= targetValue) {
                return false;
            }
            rangeAllowed[1] = Math.min(r, targetValue - 1);
        } else {
            if (rangeAllowed[1] <= targetValue) {
                return false;
            }
            rangeAllowed[0] = Math.max(targetValue, l);
        }
    }

    return true;
}

/**
 * 
 * @param {Map<String, [number, number]>} allowedRanges 
 * @returns {number}
 */
function calculateCombinations(allowedRanges) {
    let product = 1;
    for (let [l, r] of allowedRanges.values()) {
        product *= 1 + (r - l);
    }

    return product;
}

/**
 * @param {string} rawInput 
 * @param {Map<string, Workflow[]>} workflows 
 * @param {Map<string, string[]>} adjList workflow -> list of incoming vertices
 */
function parseInput(rawInput, workflows, adjList) {
    let [rules, input] = rawInput.split('\n\n');
    for (let rawWorkflow of rules.split('\n')) {
        let [ruleName, rawWorkflowBody] = rawWorkflow.split('{');
        rawWorkflowBody = rawWorkflowBody.slice(0, rawWorkflowBody.length - 1);

        let rawSubRules = rawWorkflowBody.split(',');
        /**
         * @type Workflow[]
         */
        let subRules = [];
        for (let rawSubRule of rawSubRules) {
            if (rawSubRule.includes(':')) {
                let [rawSubRuleRule, rawSubRuleTarget] = rawSubRule.split(':');
                if (rawSubRuleTarget !== 'A' && rawSubRuleTarget !== 'R') {
                    let list = adjList.get(rawSubRuleTarget) ?? [];
                    list.push(ruleName);
                    adjList.set(rawSubRuleTarget, list);
                }

                let fieldName = '';
                for (let i = 0; i < rawSubRuleRule.length; ++i) {
                    if (rawSubRuleRule[i] === '>' || rawSubRuleRule[i] === '<') {
                        let gt = rawSubRuleRule[i] === '>';
                        let targetValue = Number(rawSubRuleRule.substring(i + 1));
                        subRules.push({
                            target: rawSubRuleTarget,
                            condition: {
                                gt,
                                fieldName,
                                targetValue
                            }
                        });
                        break;
                    }

                    fieldName += rawSubRule[i];
                }
            } else {
                if (rawSubRule === 'A') {
                    subRules.push({ target: 'A', condition: null });
                } else if (rawSubRule !== 'R') {
                    let list = adjList.get(rawSubRule) ?? [];
                    list.push(ruleName);
                    adjList.set(rawSubRule, list);
                    subRules.push({ target: rawSubRule, condition: null });
                }
            }
        }

        workflows.set(ruleName, subRules);

    }
}
