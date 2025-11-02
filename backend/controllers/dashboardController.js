const Income = require("../models/Income")
const Expense = require("../models/Expense")
const { isValidObjectId, Types } = require("mongoose")

//Dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        // Get the user ID from the logged-in user
        const userid = req.user.id
        const userObjectId = new Types.ObjectId(String(userid))

        //fetch total income & expenses
        // Calculate total income for this user
        const totalIncome = await Income.aggregate([
            { $match: { userid: userObjectId } }, // Match documents belonging to this user
            { $group: { _id: null, total: { $sum: "$amount" } } }// Sum all 'amount' fields
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userid) });

        // Calculate total expense for this user
        const totalExpense = await Expense.aggregate([
            { $match: { userid: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        //Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userid,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 })// Sort by newest first

        //Get total income for last 60days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        )

        //Get expense transactions in the last 30 days
        const last30DaysExpensetransactions = await Expense.find({
            userid,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 })

        //Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpensetransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        //Fetch last 5 transactions (income+expenses)
        const lastTransactions = [
            ...(await Income.find({ userid }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userid }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);//Sort latest first

        //Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transaction: last30DaysExpensetransactions
            },
            last60DaysExpenses: {
                total: expensesLast30Days,
                transaction: last30DaysExpensetransactions
            },
            recentTransactions: lastTransactions
        })
    } catch (error) {
        console.error("Dashboard Error:", error)
        res.status(500).json({ message: "Server Error", error })
    }
}