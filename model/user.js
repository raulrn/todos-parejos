
module.exports = 
{
	user: function (nick, email, password, isOnline, isCard, card) 
	{
		this.nick = nick;
		this.email = email;
		this.password = password;
		this.isOnline = isOnline;
		this.isCard = isCard;
		this.card = card;
	}
}