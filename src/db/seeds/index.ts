import seedUsers from "./user.seed"

const seed = async () => {
    console.log('Starting seed...');
    seedUsers();
    console.log('Finished seeding.');
}

seed().catch(error => console.log(error))
