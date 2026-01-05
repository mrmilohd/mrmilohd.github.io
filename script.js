// Put your contract address here
const CONTRACT_ADDRESS = "0x30DAc8A8B09a1cba718995f26DfBa19bfE355B98";

const CONTRACT_ABI = [
    "function set(uint256 _number) public",
    "function get() public view returns (uint256)"
];

let contract;

// Connect Wallet
document.getElementById('connectBtn').onclick = async function() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            document.getElementById('status').textContent = "Wallet Connected!";
        } catch (error) {
            console.error(error);
            document.getElementById('status').textContent = "Connection Failed";
        }
    } else {
        document.getElementById('status').textContent = "Please install MetaMask!";
    }
}

// Store Number
document.getElementById('storeBtn').onclick = async function() {
    if (!contract) {
        alert("Please connect wallet first!");
        return;
    }
    try {
        const number = document.getElementById('numberInput').value;
        const tx = await contract.set(number);
        document.getElementById('status').textContent = "Storing... (Check MetaMask)";
        await tx.wait();
        document.getElementById('status').textContent = "Stored Successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').textContent = "Error Storing";
    }
}

// Get Number
document.getElementById('retrieveBtn').onclick = async function() {
    if (!contract) {
        alert("Please connect wallet first!");
        return;
    }
    try {
        const value = await contract.get();
        document.getElementById('storedValue').textContent = value.toString();
        document.getElementById('status').textContent = "Retrieved!";
    } catch (error) {
        console.error(error);
        document.getElementById('status').textContent = "Error Retrieving";
    }
}