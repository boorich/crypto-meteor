import '../imports/startup/init.js';
import '../imports/startup/accounts-config.js';
import '../imports/ui/dashboard/dashboard.js';
import '../imports/ui/projects/dev/devprojects.js';
import '../imports/ui/projects/rev/revprojects.js';
import '../imports/ui/detail/detailproject.js';
import '../imports/route.js';
import './contract.js';
import { SmartContract } from './SmartContract';

var test = new SmartContract("test", "jo");
console.log(test);







