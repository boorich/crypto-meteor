/**
 * not used right now only for test purpose. It is just a sample....
 * in prgress / a proper class structure should be used instead of bitched contract.js
 */
class SmartContract {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    makeTaco() {
        console.log( `Nothing like a ${this.name} taco with ${this.address}!` );
    }

    getUser() {
        let currentAccount = web3.eth.accounts[0];
        console.log("currentAccount", currentAccount);
        return currentAccount;
    };

}

export { SmartContract };