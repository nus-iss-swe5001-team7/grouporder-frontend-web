export class CartMemento {
    constructor(cartItems, showCart, discountedTotalPrice) {
        this.cartItems = cartItems;
        this.showCart = showCart;
        this.discountedTotalPrice = discountedTotalPrice;
    }
}