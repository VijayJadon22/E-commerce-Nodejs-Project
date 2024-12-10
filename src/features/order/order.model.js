
export class OrderModel{
    constructor(userId,totalAmount) {
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.timestamp = new Date().toLocaleString();
    }
}