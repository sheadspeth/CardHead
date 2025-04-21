// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

    contract company{

        struct Company{
            string name;
            string[] series;
        }

        mapping(address => Company) public companies;

        event companyAdded(address indexed companyAddress, string name);
        event seriesAdded(address indexed companyAddress, string seriesName);

  // Register a new company (e.g. Pokemon Company)
    function addCompany(string memory _name) public {
        require(bytes(companies[msg.sender].name).length == 0, "Company already exists");
        companies[msg.sender].name = _name;

        emit companyAdded(msg.sender, _name);
    }

    // Add a new card series under the caller's company (e.g. Base Set, Jungle, etc.)
    function addSeries(string memory _seriesName) public {
        require(bytes(companies[msg.sender].name).length > 0, "Register company first");

        companies[msg.sender].series.push(_seriesName);

        emit seriesAdded(msg.sender, _seriesName);
    }

    // Get all series for a company
    function getCompanySeries(address _companyAddr) public view returns (string[] memory) {
        return companies[_companyAddr].series;
    }

    // Optional: Get company name
    function getCompanyName(address _companyAddr) public view returns (string memory) {
        return companies[_companyAddr].name;
    }
    }