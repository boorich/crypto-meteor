/// @title This is the contract title.
/// @author Homer Simpson

pragma solidity 0.4.21;
contract GavCoin
{
    /// @notice Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of
    /// `message.caller.address()`, to an account accessible only by `to.address()
    /// @dev This should be the documentation of the function for the developer docs
    /// @param to The address of the recipient of the GavCoin
    /// @param valueInmGAV The GavCoin value to send
    function send(address to, uint256 valueInmGAV) {
        if (balances[msg.sender] >= valueInmGAV) {
            balances[to] += valueInmGAV;
            balances[msg.sender] -= valueInmGAV;
        }
    }

    /// @notice `(balanceInmGAV / 1000).fixed(0,3)` GAV is the total funds available to `who.address()`.
    /// @param who The address of the person whose balance we check
    /// @return The balance of the user provided as argument
    function balance(address who) constant returns (uint256 balanceInmGAV) {
        balanceInmGAV = balances[who];
    }

    mapping (address => uint256) balances;
}