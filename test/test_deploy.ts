
import { network, ethers, waffle } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Deployment Test", function () {

    let contractOwner: SignerWithAddress | null = null;
    let Token, tokenDeployed;

    it("Should deploy and return the contract address", async function () {
        Token = await ethers.getContractFactory('Greeter');
        tokenDeployed = await Token.deploy('Anonymous');
        console.log("Contract deployed to:", tokenDeployed.address);
    });
        
});
