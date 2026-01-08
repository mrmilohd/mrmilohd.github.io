const CONTRACT_ADDRESS = "0x30DAc8A8B09a1cba718995f26DfBa19bfE355B98";

const CONTRACT_ABI = [
    "function set(uint256 _number) public",
    "function get() public view returns (uint256)"
];

let contract;

document.getElementById("connectBtn").onclick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] });
    const signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    document.getElementById("status").textContent = "Connected";
};

document.getElementById("storeBtn").onclick = async () => {
    const num = document.getElementById("numberInput").value;
    const tx = await contract.set(num);
    await tx.wait();
    document.getElementById("status").textContent = "Stored";
};

document.getElementById("retrieveBtn").onclick = async () => {
    const value = await contract.get();
    document.getElementById("storedValue").textContent = value.toString();
    document.getElementById("status").textContent = "Done";
};
