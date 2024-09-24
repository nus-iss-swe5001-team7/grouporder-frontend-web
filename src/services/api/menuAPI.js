import Api from "@/services/api/baseAPI";

const Menu = '/restaurant-service/menuAPI/menu';
export default {
    getAllMenus: ()=> Api().get(Menu)
}