import { blocking_category } from "./blockingCategories";

export function categoryMatcher(domain) {
  for (const category of blocking_category) {
    if (category.domains.includes(domain)) {
      return category.id;
    }
  }

  return null;
}