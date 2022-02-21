const main = async () => {
    // getting our contract
    const transactionFactory = await hre.ethers.getContractFactory('Transactions');
    // deploying our contract
    const transactionContract = await transactionFactory.deploy();

    await transactionContract.deployed(); // waiting for our contract to get deployed
    console.log('Transactions contract deployed to: ', transactionContract.address);
}

    // IIFE
    // Anonymous function which will run immediately
    ; (async () => {
        try {
            await main();
            process.exit(0);
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })()