// Functions & hooks
import { LoaderFunction } from "react-router";

// Data & config
import { auth, database } from "../../../firebase";
import { get, ref } from "firebase/database";

const formsListLoader: LoaderFunction = async () => {
  try {
    // Get current user unique ID
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const forms = await get(ref(database, `/users/${uid}/forms`));
      return forms.val();
    } else {
      // User is not logged in, handle accordingly

      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export default formsListLoader;
