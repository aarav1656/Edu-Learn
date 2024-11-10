import { ethers } from "ethers";
import { type Provider, type Signer, Wallet } from "ethers";
import abi from "@/contract/ABI.json";

export class LearningPlatformClient {
  private contract: ethers.Contract;
  private signer?: Signer;

  constructor(contractAddress: string, providerOrSigner: Provider | Signer) {
    if (providerOrSigner instanceof Wallet) {
      this.signer = providerOrSigner;
      this.contract = new ethers.Contract(contractAddress, abi, this.signer);
    } else {
      this.contract = new ethers.Contract(
        contractAddress,
        abi,
        providerOrSigner
      );
    }
  }

  private async logTransaction(
    tx: ethers.ContractTransactionResponse,
    operation: string
  ) {
    console.log(`${operation} transaction hash:`, tx.hash);
    const receipt = await tx.wait();
    console.log(`${operation} confirmed in block:`, receipt?.blockNumber);
    return tx;
  }

  // User Registration
  async registerUser(
    name: string,
    email: string
  ): Promise<ethers.ContractTransactionResponse> {
    if (!this.signer) throw new Error("Signer required for this operation");
    try {
      const tx = await this.contract.registerUser(name, email);
      return await this.logTransaction(tx, "Register user");
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Admin Functions
  async addContent(
    contentType: string,
    experiencePoints: number
  ): Promise<ethers.ContractTransactionResponse> {
    if (!this.signer) throw new Error("Signer required for this operation");
    try {
      const tx = await this.contract.addContent(contentType, experiencePoints);
      return await this.logTransaction(tx, "Add content");
    } catch (error) {
      console.error("Error adding content:", error);
      throw error;
    }
  }

  // User Progress Functions
  async completeContent(
    contentId: number
  ): Promise<ethers.ContractTransactionResponse> {
    if (!this.signer) throw new Error("Signer required for this operation");
    try {
      const tx = await this.contract.completeContent(contentId);
      return await this.logTransaction(tx, "Complete content");
    } catch (error) {
      console.error("Error completing content:", error);
      throw error;
    }
  }

  // View Functions - these don't need transaction logs as they don't modify state
  async getUserProgress(userAddress: string) {
    try {
      const progress = await this.contract.getUserProgress(userAddress);
      return {
        isRegistered: progress[0],
        name: progress[1],
        email: progress[2],
        currentLevel: Number(progress[3]),
        experiencePoints: Number(progress[4]),
        nftTokenId: Number(progress[5]),
      };
    } catch (error) {
      console.error("Error getting user progress:", error);
      throw error;
    }
  }

  async hasCompletedContent(
    userAddress: string,
    contentId: number
  ): Promise<boolean> {
    try {
      return await this.contract.hasCompletedContent(userAddress, contentId);
    } catch (error) {
      console.error("Error checking completed content:", error);
      throw error;
    }
  }

  async getContent(contentId: number) {
    try {
      const content = await this.contract.learningContent(contentId);
      return {
        contentType: content[0],
        experiencePoints: Number(content[1]),
        isActive: content[2],
      };
    } catch (error) {
      console.error("Error getting content:", error);
      throw error;
    }
  }

  async getContentCount(): Promise<number> {
    try {
      const count = await this.contract.contentCount();
      return Number(count);
    } catch (error) {
      console.error("Error getting content count:", error);
      throw error;
    }
  }

  async getLevelThreshold(level: number): Promise<number> {
    try {
      const threshold = await this.contract.levelThresholds(level);
      return Number(threshold);
    } catch (error) {
      console.error("Error getting level threshold:", error);
      throw error;
    }
  }

  // Event Listeners
  onUserRegistered(
    callback: (user: string, name: string, email: string) => void
  ): ethers.Contract {
    this.contract.on(
      "UserRegistered",
      (user: string, name: string, email: string) => {
        console.log("User registered event:", { user, name, email });
        callback(user, name, email);
      }
    );
    return this.contract;
  }

  onContentCompleted(
    callback: (user: string, contentId: number, xpEarned: number) => void
  ): ethers.Contract {
    this.contract.on(
      "ContentCompleted",
      (user: string, contentId: bigint, xpEarned: bigint) => {
        console.log("Content completed event:", {
          user,
          contentId: Number(contentId),
          xpEarned: Number(xpEarned),
        });
        callback(user, Number(contentId), Number(xpEarned));
      }
    );
    return this.contract;
  }

  onLevelUp(
    callback: (user: string, newLevel: number) => void
  ): ethers.Contract {
    this.contract.on("LevelUp", (user: string, newLevel: bigint) => {
      console.log("Level up event:", { user, newLevel: Number(newLevel) });
      callback(user, Number(newLevel));
    });
    return this.contract;
  }

  onNFTUpdated(
    callback: (user: string, tokenId: number, newTokenURI: string) => void
  ): ethers.Contract {
    this.contract.on(
      "NFTUpdated",
      (user: string, tokenId: bigint, newTokenURI: string) => {
        console.log("NFT updated event:", {
          user,
          tokenId: Number(tokenId),
          newTokenURI,
        });
        callback(user, Number(tokenId), newTokenURI);
      }
    );
    return this.contract;
  }

  // Cleanup
  removeAllListeners(): void {
    this.contract.removeAllListeners();
  }
}
