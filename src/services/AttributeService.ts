import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import { DocumentData, getDoc, doc } from "firebase/firestore";
import { Attribute } from "types";
import { ATTRIBUTES } from "@/constants";

async function getAttribute(id: string) {
  const attribute = ref<Attribute>();

  try {
    const res: DocumentData = await getDoc(
      doc(projectFirestore, ATTRIBUTES, id)
    );
    attribute.value = {
      id: res.id,
      ...res.data(),
    };
    if (!res.exists) {
      throw new Error("That attribute does not exist");
    }
  } catch (err) {
    console.error(err);
  }

  return attribute;
}

export { getAttribute };
