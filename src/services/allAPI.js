import apiServices from '../api/apiServices'

export const getAllMenuAPI = async () => {
    return await apiServices('GET', '/menu', {})
}

export const viewMenuAPI = async (menuId) => {
    return await apiServices('GET', `/menu/${menuId}`, {})
}

export const saveMenuAPI = async (menuDetails) => {
    return await apiServices('POST', '/menu', menuDetails)
}

export const updateMenuAPI = async (menuId, menuDetails) => {
    return await apiServices('PUT', `/menu/${menuId}`, menuDetails)
}

export const deleteMenuAPI = async (menuId) => {
    return await apiServices('DELETE', `/menu/${menuId}`, {})
}

export const saveOrderAPI = async (orderDetails) => {
    return await apiServices('POST', '/orders', orderDetails)
}

export const getAllOrdersAPI = async () => {
    return await apiServices('GET', '/orders', {})
}

export const viewOrderAPI = async (orderId) => {
    return await apiServices('GET', `/orders/${orderId}`, {})
}

export const updateOrderAPI = async (orderId, orderDetails) => {
    return await apiServices('PUT', `/orders/${orderId}`, orderDetails)
}

export const deleteOrderAPI = async (orderId) => {
    return await apiServices('DELETE', `/orders/${orderId}`, {})
}

export const saveBookingAPI = async (bookingDetails) => {
    return await apiServices('POST', '/bookings', bookingDetails)
}

export const getAllBookingsAPI = async () => {
    return await apiServices('GET', '/bookings', {})
}

export const viewBookingAPI = async (bookingId) => {
    return await apiServices('GET', `/bookings/${bookingId}`, {})
}

export const updateBookingAPI = async (bookingId, bookingDetails) => {
    return await apiServices('PUT', `/bookings/${bookingId}`, bookingDetails)
}

export const deleteBookingAPI = async (bookingId) => {
    return await apiServices('DELETE', `/bookings/${bookingId}`, {})
}