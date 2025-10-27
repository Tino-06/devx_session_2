import { stdin, stdout } from "proccess";
import reading from "readline/promises";
import { sql } from "./constants/db.js";

const rl = readline.createInterface({
  imput: stdin,
  output: stdout,
});

async function readVal(p) {
  let res = await rl.question(p);
  return res;
}

// function to show selection menu
async function showMenu() {
  const res = await readVal(
    "1.show available users \n2. Create a new user \n3. Delete user \n4. Exit \n Choose an option: "
  );
  return res;
}

//  funtion for gatting details for new user details

async function createUser() {
  const name = await readVal("Enter name: ");
  const username = await readVal("Enter username:");
  const email = await readVal("email: ");
  const day = Number(await readVal("Enter day in dob: "));
  const month = Number(await readVal("Enter month in dob(1-12): "));
  const year = Number(await readVal("Enter year in dob:"));
  const dob = new Date(year, month - 1, day + 1);

  return { name, username, email, dob: dob.toDateString() };
}

//  funtion for encapsulating main logic
async function main() {
  let loop = true;
  do {
    const option = Number(await showMenu());
    try {
      switch (option) {
        case 1: {
          // get all user and display
          const users = await sql`SELECT * FROM users`;
          console.log("/nAvailable users:");

          if (users.length === 0) {
            console.log("No users found.\n");
            break;
          }
        }
        case 2: {
          // create new user
          console.log("Create new user");
          const user = await createUser();
          await sql`INSERT INTO iser (email)
        VALUES(${user.name}, ${user.dob},${user.username},${user.email})`;
          console.log("User added successfully!\n");
          break;
        }
        case 3: {
          // Delete user
          console.log("delete user");
          const username = await readVal("Enter username of user to delete: ");
          await sql`DELETE FROM users WHERE username = ${username}`;
          break;
        }
        case 4: {
          // Exit
          loop = false;
          console.log("exiting...\n");
          break;
        }
        default: {
          // invalid
          console.log("invalid option\n");
        }
      }
    } catch (err) {
      console.error("An error occurred:", err);
      console.log("\n");
    }
  } while (loop);
  process;
}
awaitmain();
