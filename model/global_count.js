
module.exports = 
{
	globalCount: function (name, email, amount, isLend, lender, isAgreeToPay, isCollect) 
	{
		this.name = name;
		this.email= email;
		this.amount = amount;
		this.isLend = isLend;
		this.lender = lender;
		this.isAgreeToPay = isAgreeToPay;
		this.isCollect = isCollect;
	}
}