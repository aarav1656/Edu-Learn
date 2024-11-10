// Deployed Address = 0xc78595b1Cb13620ab4bFA6de97F6b1238298e0ec

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LearningPlatform is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct User {
        bool isRegistered;
        string name;
        string email;
        uint256 currentLevel;
        uint256 experiencePoints;
        mapping(uint256 => bool) completedContent;
        uint256 nftTokenId;
    }

    struct Content {
        string contentType; 
        uint256 experiencePoints;
        bool isActive;
    }

    mapping(address => User) public users;
    mapping(uint256 => Content) public learningContent;
    mapping(string => bool) private usedEmails; 
    
    uint256 public contentCount;
    uint256[] public levelThresholds = [100, 250, 500, 1000, 2000]; 

    event UserRegistered(address indexed user, string name, string email);
    event ContentCompleted(address indexed user, uint256 contentId, uint256 xpEarned);
    event LevelUp(address indexed user, uint256 newLevel);
    event NFTUpdated(address indexed user, uint256 tokenId, string newTokenURI);

    constructor() ERC721("DynamicLearningNFT", "LEARN") Ownable(msg.sender) {}

    function registerUser(string memory _name, string memory _email) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(!usedEmails[_email], "Email already registered");
        
        users[msg.sender].isRegistered = true;
        users[msg.sender].name = _name;
        users[msg.sender].email = _email;
        users[msg.sender].currentLevel = 0;
        users[msg.sender].experiencePoints = 0;

        usedEmails[_email] = true;

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        users[msg.sender].nftTokenId = newTokenId;
        _setTokenURI(newTokenId, _getInitialNFTURI());

        emit UserRegistered(msg.sender, _name, _email);
    }

    function addContent(
        string memory contentType,
        uint256 experiencePoints
    ) external onlyOwner {
        contentCount++;
        learningContent[contentCount] = Content({
            contentType: contentType,
            experiencePoints: experiencePoints,
            isActive: true
        });
    }

    function completeContent(uint256 contentId) external {
        require(users[msg.sender].isRegistered, "User not registered");
        require(contentId <= contentCount, "Invalid content ID");
        require(learningContent[contentId].isActive, "Content not active");
        require(!users[msg.sender].completedContent[contentId], "Content already completed");

        users[msg.sender].completedContent[contentId] = true;
        uint256 xpEarned = learningContent[contentId].experiencePoints;
        users[msg.sender].experiencePoints += xpEarned;

        uint256 newLevel = _calculateLevel(users[msg.sender].experiencePoints);
        if (newLevel > users[msg.sender].currentLevel) {
            users[msg.sender].currentLevel = newLevel;
            _updateNFT(msg.sender);
            emit LevelUp(msg.sender, newLevel);
        }

        emit ContentCompleted(msg.sender, contentId, xpEarned);
    }

    function _calculateLevel(uint256 xp) internal view returns (uint256) {
        for (uint256 i = 0; i < levelThresholds.length; i++) {
            if (xp < levelThresholds[i]) {
                return i;
            }
        }
        return levelThresholds.length;
    }

    function _updateNFT(address user) internal {
        uint256 tokenId = users[user].nftTokenId;
        require(ownerOf(tokenId) == user, "Token does not exist or not owned");
        string memory newTokenURI = _generateTokenURI(users[user].currentLevel);
        _setTokenURI(tokenId, newTokenURI);
        emit NFTUpdated(user, tokenId, newTokenURI);
    }

    function _generateTokenURI(uint256 level) internal pure returns (string memory) {
        return string(abi.encodePacked("ipfs://baseURI/level/", _toString(level)));
    }

    function _getInitialNFTURI() internal pure returns (string memory) {
        return "ipfs://baseURI/level/0";
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function getUserProgress(address user) external view returns (
        bool isRegistered,
        string memory name,
        string memory email,
        uint256 currentLevel,
        uint256 experiencePoints,
        uint256 nftTokenId
    ) {
        User storage userData = users[user];
        return (
            userData.isRegistered,
            userData.name,
            userData.email,
            userData.currentLevel,
            userData.experiencePoints,
            userData.nftTokenId
        );
    }

    function hasCompletedContent(address user, uint256 contentId) external view returns (bool) {
        return users[user].completedContent[contentId];
    }
}