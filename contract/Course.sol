// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Course {
    address public creator;
    string[] public lessonURIs;

    mapping(address => bool) public enrolled;
    mapping(address => uint256) public progress;

    event Enrolled(address indexed student);
    event LessonCompleted(address indexed student, uint256 lessonIndex);
    event LessonAdded(uint256 lessonIndex, string uri);
    event LessonModified(uint256 lessonIndex, string uri);
    event LessonDeleted(uint256 lessonIndex);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can modify");
        _;
    }

    modifier validLessonIndex(uint256 index) {
        require(index < lessonURIs.length, "Invalid lesson index");
        _;
    }

    constructor(address _creator, string[] memory _lessonURIs) {
        creator = _creator;
        lessonURIs = _lessonURIs;
    }

    function enroll() external {
        require(!enrolled[msg.sender], "Already enrolled");

        enrolled[msg.sender] = true;
        progress[msg.sender] = 0;

        emit Enrolled(msg.sender);
    }

    function completeLesson() external {
        require(
            enrolled[msg.sender],
            "You must enroll before starting lessons"
        );
        uint256 userProgress = progress[msg.sender];
        require(userProgress < lessonURIs.length, "Course already completed");

        progress[msg.sender] = userProgress + 1;

        emit LessonCompleted(msg.sender, userProgress);
    }

    function getLessonURI(
        uint256 lessonIndex
    ) external view validLessonIndex(lessonIndex) returns (string memory) {
        require(enrolled[msg.sender], "You must enroll to access lessons");
        require(progress[msg.sender] >= lessonIndex, "Lesson not unlocked yet");
        return lessonURIs[lessonIndex];
    }

    function courseCompletion(address student) external view returns (bool) {
        return progress[student] == lessonURIs.length;
    }

    function totalLessons() external view returns (uint256) {
        return lessonURIs.length;
    }

    // ----- Admin functions for the creator -----

    function addLesson(string memory uri) external onlyCreator {
        lessonURIs.push(uri);
        emit LessonAdded(lessonURIs.length - 1, uri);
    }

    function modifyLesson(
        uint256 lessonIndex,
        string memory uri
    ) external onlyCreator validLessonIndex(lessonIndex) {
        lessonURIs[lessonIndex] = uri;
        emit LessonModified(lessonIndex, uri);
    }

    function deleteLesson(
        uint256 lessonIndex
    ) external onlyCreator validLessonIndex(lessonIndex) {
        for (uint256 i = lessonIndex; i < lessonURIs.length - 1; i++) {
            lessonURIs[i] = lessonURIs[i + 1];
        }
        lessonURIs.pop();

        for (uint256 i = 0; i < lessonURIs.length; i++) {
            address student = msg.sender;
            if (progress[student] > lessonIndex) {
                progress[student] -= 1;
            }
        }

        emit LessonDeleted(lessonIndex);
    }
}
