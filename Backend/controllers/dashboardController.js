
const dashboardModel = require("../models/dashboardModel");

const getDashboardData = async (req, res) => {
    try {
        const productsCount = await dashboardModel.getProductsCount();
        const usersCount = await dashboardModel.getUsersCount();

        res.status(200).json({
            products: productsCount,
            users: usersCount,
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { getDashboardData };
