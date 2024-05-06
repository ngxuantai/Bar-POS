import { ref } from "vue";
import { projectFirestore } from "../config/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
  doc,
} from "firebase/firestore";
import { Category } from "types";
import { CATEGORIES, ID_PARENT_CATEGORY } from "@/constants";

async function getCategoryById(id: string) {
  const childCategories = ref<Category[]>([]);
  try {
    const childCategoryQuery = query(
      collection(projectFirestore, CATEGORIES),
      where(ID_PARENT_CATEGORY, "==", doc(projectFirestore, CATEGORIES, id))
    );
    const childCategoryQuerySnapshot = await getDocs(childCategoryQuery);
    childCategoryQuerySnapshot.forEach((doc: DocumentData) => {
      childCategories.value.push({
        id: doc.id,
        name: doc.data().name,
        check: false,
      });
    });
    return childCategories.value;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function getAllCategory() {
  const categories = ref<Category[]>([]);
  try {
    const parentCategoryQuery = query(
      collection(projectFirestore, CATEGORIES),
      where(ID_PARENT_CATEGORY, "==", "0")
    );
    const parentCategoryQuerySnapshot = await getDocs(parentCategoryQuery);
    parentCategoryQuerySnapshot.forEach(async (doc: DocumentData) => {
      const childCategories = await getCategoryById(doc.id);
      categories.value.push({
        id: doc.id,
        name: doc.data().name,
        check: false,
        children: childCategories,
      });
    });
    return { categories };
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export { getCategoryById, getAllCategory };
