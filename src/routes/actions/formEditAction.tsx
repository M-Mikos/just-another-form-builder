// Functions & hooks
import { push, set, update, ref, remove, get } from "firebase/database";

// Data & config
import { auth, database } from "../../../firebase";

const formEditAction: ActionFunction = async ({ params, request }) => {
  try {
    // Get current user unique ID
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;

    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Select action method
    switch (request.method) {
      case "POST": {
        // Adding new field
        // Get key for new field database entry
        const newFieldKey = push(
          ref(database, `/users/${uid}/formsFields/${params.formId}/fields`)
        ).key as string;

        // Set new default field in database
        set(
          ref(
            database,
            `/users/${uid}/formsFields/${params.formId}/${newFieldKey}`
          ),
          {
            fieldType: "Short",
            id: newFieldKey,
            required: false,
            title: "Question",
          }
        );

        // Add new field id to fields order array

        const fieldsOrderSnapshot = await get(
          ref(database, `/users/${uid}/forms/${params.formId}/fieldsOrder`)
        );

        let fieldsOrderArr: string[] = [];

        if (fieldsOrderSnapshot.exists()) {
          fieldsOrderArr = [...fieldsOrderSnapshot.val()];
          fieldsOrderArr.push(newFieldKey);
        } else fieldsOrderArr = [newFieldKey];

        update(ref(database), {
          [`/users/${uid}/forms/${params.formId}/fieldsOrder`]: fieldsOrderArr,
        });

        break;
      }
      case "DELETE": {
        // Deleting field answers in each form answers set

        const answers = await get(
          ref(database, `/users/${uid}/formsAnswers/${params.formId}`)
        );

        answers.forEach((child) => {
          const answersSetId: string = child.val().slice(-1)[0];

          remove(
            ref(
              database,
              `/users/${uid}/formsAnswers/${params.formId}/${answersSetId}/${formDataObj.fieldId}`
            )
          );
        });

        // Deleting form field
        remove(
          ref(
            database,
            `/users/${uid}/formsFields/${params.formId}/${formDataObj.fieldId}`
          )
        );

        // Deleting field id in fields order array

        const fieldsOrderSnapshot = await get(
          ref(database, `/users/${uid}/forms/${params.formId}/fieldsOrder`)
        );

        let fieldsOrderArr: string[] = fieldsOrderSnapshot
          .val()
          .filter((id: string) => id !== formDataObj.fieldId);

        update(ref(database), {
          [`/users/${uid}/forms/${params.formId}/fieldsOrder`]: fieldsOrderArr,
        });

        break;
      }

      case "PATCH": {
        // Updating field

        set(
          ref(
            database,
            `/users/${uid}/formsFields/${params.formId}/${formDataObj.fieldId}`
          ),
          {
            fieldType: formDataObj.fieldType,
            id: formDataObj.fieldId,
            title: formDataObj.title,
            ...(formDataObj.required
              ? { required: true }
              : { required: false }),
            ...(formDataObj.attributes && {
              attributes: formDataObj.attributes,
            }),
          }
        );
        break;
      }
    }

    return { ok: true };
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default formEditAction;
