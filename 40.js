let input = ``;

/**
 * @typedef {boolean} Pulse
 * false = lo
 */

/** @type {Pulse} */
const HI = true;
/** @type {Pulse} */
const LO = false;

/**
 * @typedef {object} Module
 * @property {string[]} outputModules
 * @property {any} state
 * @property {number} inputCount
 * @property {boolean} shouldSend
 * @property {function(Pulse):void} takeInput
 * @property {function():Pulse} getModuleOutput
 * @property {string} name
 */
/**
 * 
 * @param {string} rawInput 
 * @returns 
 */
function doIt(rawInput) {

    let [broadcaster, modules] = parseInput(rawInput);

    let cycleParticipants = new Map([['dl',[]], ['fr',[]], ['rv',[]], ['bt',[]]]);
    let cycleParticipantsNeeded = cycleParticipants.size;
        
    var loPulses = 0;
    var hiPulses = 0;

    for(let i = 0; cycleParticipantsNeeded > 0; ++i) {
        loPulses += 1;
        broadcaster.takeInput(LO);
    
        let q = [broadcaster];
        let q2 = [];

    
        while(q.length && cycleParticipantsNeeded > 0) {
            let cur = q.pop();

            
            let toSend = cur.getModuleOutput();
            if(toSend !== null) {
                for(let target of cur.outputModules) {
                    let targetMod = modules.get(target);
                    if(targetMod.takeInput) {
                        q2.push(targetMod);
                        targetMod.takeInput(toSend, cur);
                    }
                }

                loPulses += toSend === LO ? cur.outputModules.length : 0;
                hiPulses += toSend === HI ? cur.outputModules.length : 0;
            }
            if(toSend === HI && cycleParticipants.has(cur.name)) {
                
                if(cycleParticipants.get(cur.name).length < 2) {
                    cycleParticipants.get(cur.name).push(i+1);
                    if(cycleParticipants.get(cur.name).length >= 2) {
                        --cycleParticipantsNeeded;
                    }
                }
            }
    
            if(!q.length) {
                [q, q2] = [q2, q];
                q.reverse();
            }
        }


    }


    console.log('lo: '  +loPulses);
    console.log('hi: ' + hiPulses);


    return lcm([...cycleParticipants.values()].map(x=>BigInt(x.at(-1) - x.at(-2))));


}

console.time()
console.log(doIt(input))
console.timeEnd()

/**
 * 
 * @param {string} rawInput 
 * @returns {[Module, Map<Module>]} broadcaster, module list
 */
function parseInput(rawInput) {
    let lines = rawInput.split('\n');

    let modules = new Map();
    let broadcaster;

    for(let line of lines) {
        let [rawModule, rawDestinations] = line.split(' -> ');

        /**
         * @type Module
         */
        let module = {
            outputModules: rawDestinations.split(', '),
            inputCount: 0,
            inputs: []
        };

        if(rawModule.startsWith('broadcaster')) {
            module.takeInput = () => {};
            module.getModuleOutput = function() {
                return LO;
            };
            broadcaster = module;
            module.name = 'broadcaster';
        } else if(rawModule.startsWith('%')) {
            //FLIP FLOP

            const ON = true;
            const OFF = false;

            module.state = OFF;
            module.takeInput = function(pulse) {
                if(pulse === LO) {
                    this.shouldSend = true;
                }
            }
            module.getModuleOutput = function() {
                if(!this.shouldSend) {
                    return null;
                }

                this.shouldSend = false;

                let toSend = this.state === OFF ? HI : LO;
                this.state = !this.state;

                return toSend;
            }

            module.name = rawModule.substring(1);
        } else if(rawModule.startsWith('&')) {
            //Conjunction
            module.state = new Set();// HI PULSES RECEIVED
            module.takeInput = function(pulse, sourceModule) {
                if(pulse === HI) {
                    this.state.add(sourceModule);
                } else {
                    this.state.delete(sourceModule);
                }
            }
            module.getModuleOutput = function() {
                let toSend = HI;

                if(this.state.size === this.inputCount) {
                    toSend = LO;
                }

                return toSend;
            }

            module.name = rawModule.substring(1);
        }

        for(let output of module.outputModules) {
            let outputMod = modules.get(output)??{inputCount:0};
            outputMod.inputCount++;
            modules.set(output, outputMod);
        }

        if(modules.has(module.name)) {
            module.inputCount = modules.get(module.name).inputCount;
        }

        modules.set(module.name, module);
    }


    return [broadcaster, modules];
}

function lcm(list) {
    let result = 1n;
    for(let blah of list) {
        result = (result * blah) / gcd(result, blah);
    }

    return result;

}

function gcd(a, b) {
    while(b) {
        [a, b] = [b, a%b];
    }
    return a;
}
