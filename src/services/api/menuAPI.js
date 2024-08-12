import Api from "@/services/api/baseAPI";

const Menu = '/menu';

export default {
    getAllMenus: ()=> Api().get(Menu)
}