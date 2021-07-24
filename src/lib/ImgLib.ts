const imgTipAmountFirst = (imgs: any) => {
	return imgs.sort((a: any, b: any) => b.tipAmount - a.tipAmount);
};

export { imgTipAmountFirst };
