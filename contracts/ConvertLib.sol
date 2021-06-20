// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

library ConvertLib {
    function convert(uint256 amount, uint256 conversionRate)
        public
        pure
        returns (uint256 convertedAmount)
    {
        return amount * conversionRate;
    }

	function isEmptyOfStr(string memory str) public pure returns(bool res) {
		require(bytes(str).length > 0);
		return res;
	}
}
