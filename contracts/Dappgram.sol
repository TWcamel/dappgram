pragma solidity >=0.4.25;

import "./ConvertLib.sol";
import "./ValidLib.sol";

contract Dappgram {
    string public name = "Dappgram";
    uint256 public imgIncrementalId = 0;
    mapping(uint256 => Img) public imgs;

    struct Img {
        uint256 id;
        string IpfsHash;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImgCreated(
        uint256 id,
        string IpfsHash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    function uploadImg(string memory _imgHash, string memory _description)
        public
    {
        ValidLib.isEmptyOfStr(_imgHash);
        ValidLib.isEmptyOfStr(_description);
        ValidLib.isVoidAddress(msg.sender);

        imgIncrementalId++;

        imgs[imgIncrementalId] = Img(
            imgIncrementalId,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        emit ImgCreated(
            imgIncrementalId,
            _imgHash,
            _description,
            0,
            msg.sender
        );
    }
}
