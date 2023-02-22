import moment from "moment";

class StringUtils {

    public fixedCategory(category: string): string {
        category = category.toLowerCase();
        return category.replace("_", " ").split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
    }

    public fixedDate(dateToReformat: string): string {
        const date = moment(dateToReformat, "YYYY-MM-DD");
        return moment(date).format("DD/MM/YYYY");
    }
}

const stringUtils = new StringUtils();
export default stringUtils;