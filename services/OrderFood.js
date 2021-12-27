const Handler = require("./databaseHandler")
const validItems = require('./Items.json')

const orderFood = class {

    constructor(){
        this.db = new Handler()
    }

    verifyItems(items){
        let temp = []
        for(const item of items){
            let flag = false;
            for(const validItem of validItems.items)
            {
                if(item.Item == validItem.name)
                {
                    flag = true;
                    break;
                }
            }
            if(flag == true && item.quantity > 0){
                temp.push(item)
            }
        }
        return temp;
    }

    placeOrder = async(roomId,items) => {
        items = this.verifyItems(items)
        //console.log(items)
        var order = await this.db.placeOrder(roomId,items);
        //console.log("Order:",order);
        if(order){
           return {"orderId":order.id,"orderPlaced":order.createdAt};
        }
    }

    showOrders = async() => {
        var allOrders = await this.db.showOrders();
        let date1 = new Date()
        let validOrders = []
        for(const order of allOrders)
        {
            var hours = Math.abs(date1 - order.createdAt) / 36e5;
            if(hours < 2){
                validOrders.push(order)
            }
            else{
                await this.db.deleteOrder(order.dataValues.id)
            }
        }
        
        //console.log("All Orders:",validOrders);
        return validOrders;
    }

    deleteOrder = async(id) => {
        var delOrder = await this.db.deleteOrder(id);
        return delOrder;
    }

    getPrice(itemName){
        for (const validItem of validItems.items) {
            if (itemName == validItem.name) {
                return validItem.price;
            }
        }
        return 0;
    }

    confirmOrder = async(id) => {
        var allOrders = await this.showOrders()
        let order = {}
        let orderFlag = false
        for(const o of allOrders)
        {
            if(o.dataValues.id == id){
                order = o.dataValues;
                orderFlag = true;
                break;
            }

        }
        let total_bill = 0
        if(orderFlag){
            for(const item of order.OrderItems){
                let price = this.getPrice(item.dataValues.Item);
                total_bill += (price * item.dataValues.quantity);
            }
            const conOrder = await this.db.confirmOrder(order,total_bill);
            if(conOrder)
                return {"Message":"Order Confirmed Successfully"};
            else
                return {"Message":"Some Error Occured"};
        }
        else{
            return "No Order";
        }
        
    }


}
module.exports = orderFood