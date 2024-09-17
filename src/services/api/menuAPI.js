import Api from "@/services/api/baseAPI";

const Menu = '/order-service/menuAPI/menu';

export default {
    getAllMenus: ()=> Api().get(Menu)
}