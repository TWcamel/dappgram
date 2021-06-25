pragma solidity >=0.4.25;

library ValidLib {
    function isEmptyOfStr(string memory str) public pure returns (bool res) {
        require(bytes(str).length > 0);
        return true;
    }

    function isVoidAddress(address _address) public pure returns (bool res) {
        require(_address != address(0x0));
        return true;
    }

    function isVaildIdOfImg(uint256 id, uint256 imgCount)
        public
        pure
        returns (bool res)
    {
        require(id > 0 && id <= imgCount);
        return true;
    }
}
