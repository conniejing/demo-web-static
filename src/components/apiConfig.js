var api = {};
var apiEnv = 'http://localhost:8080/mock';

/* auth 注册、登陆、认证、个人信息 */
api.auth = {};
api.auth.register = apiEnv + '/users';
api.auth.login = apiEnv + '/users/login';
api.auth.logout = apiEnv + '/users/logout';
api.auth.changePassword = apiEnv + '/users/{userId}';
api.auth.myinfo = apiEnv + '/users/{userId}';
api.auth.updateMyinfo = '';
api.auth.updatePwd = apiEnv + '/users/';
api.auth.notifications = apiEnv + '/users/{userId}/notifications';
api.auth.unreadNotifications = apiEnv + '/users/{userId}/unreadNotifications';
api.auth.untreatedOrders = apiEnv + '/users/{userId}/untreatedOrders';

/* vehicle 车辆信息 */
api.vehicle = {};
api.vehicle.list = apiEnv + '/vehicle/list';
api.vehicle.plateList = apiEnv + '/vehicle/plates';
api.vehicle.add = apiEnv + '/vehicle/saveVehicle';
api.vehicle.update = apiEnv + '/vehicle/modifyVehicle';
api.vehicle.info = apiEnv + '/vehicle/{id}';
api.vehicle.eventList = apiEnv + '/vehicle/event/list';
api.vehicle.eventHandle = apiEnv + '/vehicle/event/handle';

api.vehicle.eventInfo = apiEnv + '/vehicle/event/id';
api.vehicle.remove = apiEnv + '/vehicle/delete/';

api.vehicle.batteryList = '../pages/vehicle/batteryModel.json';
api.vehicle.monitor = apiEnv + '/vehicle/realStatus/id';

/* rentedVehicle 我租过的车*/
api.rentedVehicle = {};
api.rentedVehicle.list = apiEnv + '/vehicle/list';
api.rentedVehicle.info = apiEnv + '/vehicle/{id}';

/* rentOrder 租入订单信息*/
api.rentOrder = {};
api.rentOrder.list = apiEnv + '/order/rentCarOrderList';
api.rentOrder.info = apiEnv + '/order/{orderId}/rentCarOrderDetail';
api.rentOrder.update = '';
api.rentOrder.statistics = apiEnv + '/order/rentCarOrderReport';

/* leaseOrder 租入订单信息*/
api.leaseOrder = {};
api.leaseOrder.list = apiEnv + '/order/getMyCarOrderList';
api.leaseOrder.info = apiEnv + '/order/{orderId}/getMyCarOrderDetail';
api.leaseOrder.update = '';
api.leaseOrder.statistics = apiEnv + '/order/myCarOrderReport';

/* 车单处理 */
api.order = {};
// 用车人请求租车
api.order.new = apiEnv + '/order/createNewOrder';
// 车主同意租车
api.order.handleNewOrder = apiEnv + '/order/{orderId}/handleNewOrder';
// 车主交车
api.order.loanCar = apiEnv + '/order/{orderId}/loanCar';
// 用车人交车
api.order.leased = apiEnv + '/order/{orderId}/leased';
// 用车人还车
api.order.returnCar = apiEnv + '/order/{orderId}/returnBackVehicle';
// 车主还车确认，订单完成
api.order.finish = apiEnv + '/order/{orderId}/finish';

/* rentCar 租用车辆 */
api.rentCar = {};
api.rentCar.list = apiEnv + '/order/canRentVehicleList';
api.rentCar.add = '';

export default api;
