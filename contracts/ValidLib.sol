pragma solidity >=0.4.25;

library ValidLib {
    function isEmptyOfStr(string memory str) public pure returns (bool res) {
        require(bytes(str).length > 0);
        return res;
    }

	function isVoidAddress(address _address) public pure returns (bool res) {
        require(_address != address(0x0));
		return res;
	}
}
