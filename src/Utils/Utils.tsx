class Utils {

    public fixedCategory(category: string): string {
        category = category.toLowerCase();
        return category.replace("_", " ").split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
    }
}

const utils = new Utils();
export default utils;