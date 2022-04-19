import { network, ethers, waffle } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { SimpleToken, SimpleToken__factory } from "../typechain-types";
import { ContractTransaction } from "ethers";

let transaction: ContractTransaction | null = null;
let contractOwner: SignerWithAddress | null = null;
let tokenReceiver: SignerWithAddress | null = null;

beforeEach(async () => {
  [contractOwner, tokenReceiver] = await ethers.getSigners();
});

let simpleTokenFactory: SimpleToken__factory | null = null;
let simpleTokenContract: SimpleToken | null = null;
let simpleTokenContractAddress: string = "";

describe.only("Deploy contract and mint token", function () {
  it("Should deploy SimpleToken and return contract address", async function () {
    simpleTokenFactory = (await ethers.getContractFactory('SimpleToken')) as SimpleToken__factory;
    simpleTokenContract = await simpleTokenFactory.deploy() as SimpleToken;
    simpleTokenContractAddress = simpleTokenContract.address;

    console.log("SimpleToken Contract deployed to:", simpleTokenContractAddress);
    expect(simpleTokenContractAddress).to.be.properAddress;
  });

  it("Should mint 100 SimpleToken to tokenReceiver", async function () {
    let simpleTokenContractConnected = simpleTokenContract!.connect(contractOwner!);
    transaction = await simpleTokenContractConnected.mint(tokenReceiver!.address, ethers.utils.parseEther('100'))

    var userTokenBalance = await simpleTokenContractConnected.balanceOf(tokenReceiver!.address);
    expect(userTokenBalance).to.equal(ethers.utils.parseEther('100'));
  })
})