// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CourseFactory {
    address public owner;
    mapping(address => address[]) public creatorCourses;
    address[] public allCourses;

    event CourseCreated(address indexed courseAddress, address indexed creator);

    constructor() {
        owner = msg.sender;
    }

    function createCourse(string[] memory lessonURIs) external {
        Course newCourse = new Course(msg.sender, lessonURIs);
        creatorCourses[msg.sender].push(address(newCourse));
        allCourses.push(address(newCourse));
        emit CourseCreated(address(newCourse), msg.sender);
    }

    function getCoursesByCreator(
        address creator
    ) external view returns (address[] memory) {
        return creatorCourses[creator];
    }

    function getAllCourses() external view returns (address[] memory) {
        return allCourses;
    }
}
